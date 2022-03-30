"use strict";
/**
 * @class userInteraction
 * @memberof ui5 
 */
const UserInteraction = function () {

  // =================================== CLICK ===================================
  /**
   * @function click
   * @memberOf ui5.userInteraction
   * @description Clicks on the element with the given selector.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.userInteraction.click(selector);
   */
  this.click = async function (selector, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    let elem = null;
    await browser.waitUntil(async function () {
      elem = await ui5.element.getDisplayed(selector, index, timeout);
      if (!elem) return false;
      return elem.isClickable();
    }, {
      timeout,
      timeoutMsg: `Element not clickable after ${timeout / 1000}s`
    });
    try {
      await elem.click();
    } catch (error) {
      if (error.message && error.message.match(new RegExp(/is not clickable at point/))) {
        const errorMessage = await util.function.mapWdioErrorToQmateErrorMessage(error, "click");
        throw new Error(errorMessage);
      }
    }
  };

  /**
   * @function clickAndRetry
   * @memberOf ui5.userInteraction
   * @description Clicks on the element with the given selector and retries the action in case of a failure.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Number} [retries=3] - The number of retries, can be set in config for all functions under params stepsRetries.
   * @param {Number} [interval=5000] - The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals. 
   * @example await ui5.userInteraction.clickAndRetry(selector);
   */
  this.clickAndRetry = async function (selector, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000, retries = 3, interval = 5000) {
    await util.function.retry(this.click, [selector, index, timeout], retries, interval, this);
  };

  /**
   * @function clickTab
   * @memberOf ui5.userInteraction
   * @description Clicks on the tab with the given selector and checks if the tab got selected successfully.
   * The function retries the click for maximal 3 times if the selection of the tab (blue underline) was not successful.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.userInteraction.clickTab(selector);
   */
  this.clickTab = async function (selector, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    await util.function.retry(async function (selector, index, timeout) {
      await ui5.userInteraction.click(selector);
      const tab = await ui5.element.getDisplayed(selector, index, timeout);
      const classList = await tab.getAttribute("class");
      if (!classList.includes("sapUxAPAnchorBarButtonSelected")) {
        throw new Error();
      }
    }, [selector, index, timeout], 3, 5000, this);
  };

  /**
   * @function clickListItem
   * @memberOf ui5.userInteraction
   * @description Clicks or opens the list item with the given selector (e.g. ColumnListItem, StandardListItem).
   * In some cases the default click function is not working correctly (clicks an element within the list item).
   * Therefore we recommend to use this function to open a specific list item.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.userInteraction.clickListItem(selector);
   */
  this.clickListItem = async function (selector, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    const elem = await ui5.element.getDisplayed(selector, index, timeout);
    await ui5.control.execute(function (control, done) {
      control.attachPress(function () {
        done();
      });
      control.firePress();
    }, elem);
  };


  // =================================== FILL ===================================
  /**
   * @function fill
   * @memberOf ui5.userInteraction
   * @description Fills the input field with the given selector.
   * @param {Object} selector - The selector describing the element.
   * @param {String} value - The value to fill.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.userInteraction.fill(selector, "My Value");
   */
  this.fill = async function (selector, value, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    if (value !== null) {
      const id = await ui5.element.getId(selector, index, timeout);
      let elem = null;
      if (selector.elementProperties.metadata === "sap.m.TextArea") {
        elem = await nonUi5.element.getByCss("[id='" + id + "'] textarea", index, timeout);
      } else {
        elem = await nonUi5.element.getByCss("[id='" + id + "'] input", index, timeout);
      }
      await elem.setValue(value);
    }
  };

  /**
   * @function fillAndRetry
   * @memberOf ui5.userInteraction
   * @description Fills the input field with the given selector and retries the action in case of a failure.
   * @param {Object} selector - The selector describing the element.
   * @param {String} value - The value to fill.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Number} [retries=3] - The number of retries, can be set in config for all functions under params stepsRetries.
   * @param {Number} [interval=5000] - The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals. 
   * @example await ui5.userInteraction.fillAndRetry(selector, "My Value");
   */
  this.fillAndRetry = async function (selector, value, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000, retries = 3, interval = 5000) {
    await util.function.retry(this.fill, [selector, value, index, timeout], retries, interval, this);
  };

  // =================================== CLEAR ===================================
  /**
   * @function clear
   * @memberOf ui5.userInteraction
   * @description Clears the input with the given selector.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.userInteraction.clear(selector);
   */

  //TODO remove clearHelper and use clear
  this.clear = async function (selector, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    await _clearHelper(selector, index, timeout);
  };

  /**
   * @function clearAndRetry
   * @memberOf ui5.userInteraction
   * @description  Clears the input with the given selector and retries the action in case of a failure
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Number} [retries=3] - The number of retries, can be set in config for all functions under params stepsRetries.
   * @param {Number} [interval=5000] - The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals.
   * @example await ui5.userInteraction.clearAndRetry(selector);
   */
  this.clearAndRetry = async function (selector, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000, retries = 3, interval = 5000) {
    await util.function.retry(this.clear, [selector, index, timeout], retries, interval, this);
  };

  /**
   * @function clearAndFill
   * @memberOf ui5.userInteraction
   * @description Clears the input field with the given selector and fills the given value.
   * @param {Object} selector - The selector describing the element.
   * @param {String} value - The value to fill.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.userInteraction.clearAndFill(selector, "My Value");
   */
  this.clearAndFill = async function (selector, value, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    if (value !== null) {
      await this.clear(selector, index, timeout);
      await common.userInteraction.fillActive(value);
    } else {
      throw new Error("Function 'clearAndFill' failed. Please provide a value as second parameter.");
    }
  };

  /**
   * @function clearAndFillAndRetry
   * @memberOf ui5.userInteraction
   * @description Clears the input field with the given selector and fills the given value. Retries the action in case of a failure.
   * @param {Object} selector - The selector describing the element.
   * @param {String} value - The value to fill.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Number} [retries=3] - The number of retries, can be set in config for all functions under params stepsRetries.
   * @param {Number} [interval=5000] - The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals. 
   * @param {Boolean} [verify=true] - Specifies if the filled value should be verified.
   * @example await ui5.userInteraction.clearAndFillAndRetry(selector, "My Value");
   */
  this.clearAndFillAndRetry = async function (selector, value, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000, retries = 3, interval = 5000, verify = true) {
    await util.function.retry(async (selector, value, index, timeout) => {
      await this.clearAndFill(selector, value, index, timeout);
      if (verify) {
        let elemValue = await ui5.element.getValue(selector, index);
        if (elemValue != value) { // IMPORTANT: keep non-strict comparison for format changes after input (10 -> 10.00)
          await util.browser.resetFocus();
          elemValue = await ui5.element.getValue(selector, index);
          if (elemValue != value) { // IMPORTANT: keep non-strict comparison for format changes after input (10 -> 10.00)
            throw new Error(`Actual value '${elemValue}' not equal to expected value '${value}'`);
          }
        }
      }
    }, [selector, value, index, timeout], retries, interval, this);
  };

  /**
   * @function clearSmartFieldInput
   * @memberOf ui5.userInteraction
   * @description Clears the smart filed with the given selector.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.userInteraction.clearSmartFieldInput(selector);
   */
  this.clearSmartFieldInput = async function (selector, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    await ui5.userInteraction.clear(selector, index, timeout);
  };

  /**
   * @function clearAndFillSmartFieldInput
   * @memberOf ui5.userInteraction
   * @description Clears the smart filed with the given selector and fills the given value.
   * @param {Object} selector - The selector describing the element.
   * @param {String} value - The value to fill.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.userInteraction.clearAndFillSmartFieldInput(selector, "My Value");
   */
  this.clearAndFillSmartFieldInput = async function (selector, value, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    const id = await ui5.element.getId(selector, index, timeout);
    const elem = await nonUi5.element.getByCss(`input[id*='${id}']`);
    await elem.click();
    await ui5.userInteraction.selectAll(selector, index, timeout);
    await elem.setValue(value);
  };

  /**
   * @function clearAndFillSmartFieldInputAndRetry
   * @memberOf ui5.userInteraction
   * @description Clears the smart filed with the given selector and fills the given value and retries the action in case of a failure.
   * @param {Object} selector - The selector describing the element.
   * @param {String} value - The value to fill.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Number} [retries=3] - The number of retries, can be set in config for all functions under params stepsRetries.
   * @param {Number} [interval=5000] - The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals. 
   * @example await ui5.userInteraction.clearAndFillSmartFieldInputAndRetry(selector, "My Value");
   */
  this.clearAndFillSmartFieldInputAndRetry = async function (selector, value, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000, retries = 3, interval = 5000) {
    await util.function.retry(this.clearAndFillSmartFieldInput, [selector, value, index, timeout], retries, interval, this);
  };


  // =================================== SELECT ===================================
  /**
   * @function selectBox
   * @memberOf ui5.userInteraction
   * @description Selects the passed value of the Select box.
   * Please note that the function will only work for the default select Box.
   * In special cases, please use the clickSelectArrow function.
   * @param {Object} selector - The selector describing the element.
   * @param {String} value - The value to select.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time).
   * @example await ui5.userInteraction.selectBox(selector, "Germany");
   */
  this.selectBox = async function (selector, value, index = 0) {
    await this.clickSelectArrow(selector, index);
    if (value) {
      const itemSelector = {
        "elementProperties": {
          "mProperties": {
            "text": value
          },
          "ancestorProperties": selector.elementProperties
        }
      };
      await this.scrollToElement(itemSelector);
      await this.click(itemSelector);
    } else {
      throw new Error("Function 'selectBox' failed: Please provide a value as second argument.");
    }
  };

  /**
   * @function selectComboBox
   * @memberOf ui5.userInteraction
   * @description Selects the passed value from the ComboBox with the given selector.
   * Please note that the function will only work for the default ComboBox.
   * In special cases you need to use the 'clickSelectArrow' function.
   * @param {Object} selector - The selector describing the element.
   * @param {String} value - The value to select.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @example await ui5.userInteraction.selectComboBox(selector, "Germany");
   */
  this.selectComboBox = async function (selector, value, index = 0) {
    await this.clickSelectArrow(selector, index);
    if (value) {
      const selector = {
        "elementProperties": {
          "metadata": "sap.m.StandardListItem",
          "mProperties": {
            "title": value
          }
        },
        "parentProperties": {
          "metadata": "sap.m.List"
        }
      };
      await this.scrollToElement(selector);
      await this.click(selector);
    }
  };

  /**
   * @function selectMultiComboBox
   * @memberOf ui5.userInteraction
   * @description Selects the passed values of the MultiComboBox with the given selector.
   * Please note that the function will only work for the default MultiComboBox.
   * In special cases, please use the clickSelectArrow function.
   * @param {Object} selector - The selector describing the element.
   * @param {Array} values - The values to select.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @example await ui5.userInteraction.selectMultiComboBox(selector, ["Option 1", "Option 2"]);
   */
  this.selectMultiComboBox = async function (selector, values, index = 0) {
    await this.clickSelectArrow(selector, index);
    for (const v in values) {
      const ui5ControlProperties = {
        "elementProperties": {
          "metadata": "sap.m.CheckBox",
          "mProperties": {}
        },
        "parentProperties": {
          "metadata": "sap.m.StandardListItem",
          "mProperties": {
            "title": values[v]
          }
        }
      };
      await this.scrollToElement(ui5ControlProperties);
      await this.click(ui5ControlProperties);
    }
    await common.userInteraction.pressEnter();
  };

  /**
   * @function clickSelectArrow
   * @memberOf ui5.userInteraction
   * @description Clicks the arrow icon at the passed selector (select box).
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time).
   * @example await ui5.userInteraction.clickSelectArrow(selector);
   */
  this.clickSelectArrow = async function (selector, index = 0) {
    const id = await ui5.element.getId(selector, index);
    const arrow = await nonUi5.element.getByCss("[id='" + id + "-arrow']", 0, 3000);
    await arrow.click();
  };

  /**
   * @function clickSelectArrowAndRetry
   * @memberOf ui5.userInteraction
   * @description Clicks the arrow icon at the passed selector (select box), and retries in case it fails.
   * @param {Object} selector - The selector describing the element
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time).
   * @param {Number} [retries=3] - The number of retries, can be set in config for all functions under params stepsRetries.
   * @param {Number} [interval=5000] - The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals. 
   * @example await ui5.userInteraction.clickSelectArrowAndRetry(selector);
   */
  this.clickSelectArrowAndRetry = async function (selector, index = 0, retries = 3, interval = 5000) {
    await util.function.retry(this.clickSelectArrow, [selector, index], retries, interval, this);
  };


  // =================================== OTHERS ===================================
  /**
   * @function scrollToElement
   * @memberOf ui5.userInteraction
   * @description Scrolls to the element with the given selector to get it into view.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {String} [alignment="center"] - Defines vertical/horizontal alignment. One of "start", "center", "end", or "nearest".
   * Affects the alignToTop parameter of scrollIntoView function. By default, it takes 'up'
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.userInteraction.scrollToElement(selector);
   * @example await ui5.userInteraction.scrollToElement(selector, 0, "start", 5000);
   */
  this.scrollToElement = async function (selector, index = 0, alignment = "center", timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    const elem = await ui5.element.getDisplayed(selector, index, timeout);
    if (elem) {
      const options = {
        "block": alignment,
        "inline": alignment
      };
      await elem.scrollIntoView(options);
    }
  };

  /**
   * @function selectAll
   * @memberOf ui5.userInteraction
   * @description Performs "select all" (ctrl + a) at the element with the given selector.
   * @param {Object} [selector] - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector, in case there are more than one elements visible at the same time. 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.userInteraction.selectAll(selector);
   */
  this.selectAll = async function (selector, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    if (selector !== undefined) {
      await this.click(selector, index, timeout);
    } else {
      util.console.info("Selector properties are undefined. Action will be performed on current element.");
    }
    await await common.userInteraction.pressKey(["\uE051", "a"]);
  };

  /**
   * @function openF4Help
   * @memberOf ui5.userInteraction
   * @description Opens the F4-help of the element with the given selector.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Boolean} useF4Key - Specifies if the help is opened by pressing the F4-key or via the button.
   * The default value is true (triggered by pressing the F4-key). Set "useF4Key" to false, to trigger the search by clicking the button.
   * @example await ui5.userInteraction.openF4Help(selector, 0, 30000, false);
   */
  this.openF4Help = async function (selector, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000, useF4Key = true) {
    await ui5.userInteraction.click(selector, index, timeout);
    if (useF4Key === true) {
      await this.pressF4();
    } else {
      const id = await ui5.element.getId(selector);
      const button = await nonUi5.element.getByCss("[id='" + id + "-vhi']", 0, timeout);
      await button.click();
    }
  };

  /**
   * @function searchFor
   * @memberOf ui5.userInteraction
   * @description Searches for the passed value and executes the search.
   * In case that the search is already filled, it will reset the field first.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Boolean} useEnter - Specifies if the search is triggered by pressing the Enter-key or via the search button.
   * The default value is true (triggered by pressing the Enter-key). Set "useEnter" to false, to trigger the search by clicking the search button.
   * @example await ui5.userInteraction.searchFor(selector, "My Value", 0, 30000, false);
   */
  this.searchFor = async function (selector, value, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000, useEnter = true) {
    await ui5.userInteraction.clearAndFillAndRetry(selector, value, index, timeout);
    if (useEnter === true) {
      await common.userInteraction.pressEnter();
    } else {
      const id = await ui5.element.getId(selector, index, timeout);
      const searchButton = await nonUi5.element.getByCss("[id='" + id + "-search']", 0, timeout);
      await searchButton.click();
    }
  };

  /**
   * @function resetSearch
   * @memberOf ui5.userInteraction
   * @description Resets the search field.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.userInteraction.resetSearch(selector);
   */
  this.resetSearch = async function (selector, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    const id = await ui5.element.getId(selector, index, timeout);
    const resetButton = await nonUi5.element.getByCss("[id='" + id + "-reset']", 0, timeout);
    await resetButton.click();
  };


  // =================================== HELPER ===================================
  //TODO: rework function in its whole. Why don't we use the clear function from native wdio here?
  async function _clearHelper(selector, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    let id, elem;
    if (selector) {
      await ui5.userInteraction.click(selector, index, timeout);
      id = await ui5.element.getId(selector, index, timeout);
      elem = await browser.getActiveElement();
    } else {
      elem = await browser.getActiveElement();
      await elem.click();
      id = await util.function.getAttribute(elem, "id");
    }

    const tokenizers = await browser.execute(function (id) {
      const t = document.getElementById(id).querySelectorAll(".sapMTokenizer");
      const inputs = document.getElementById(id).getElementsByTagName("input");
      const textareas = document.getElementById(id).getElementsByTagName("textarea");

      if (inputs.length) {
        inputs[0].value = "";
        inputs[0].focus();
      }

      if (textareas.length) {
        textareas[0].value = "";
      }
      return t;

    }, id);

    if (await tokenizers && await tokenizers.length) {
      await ui5.userInteraction.selectAll(selector, index, timeout);
      await common.userInteraction.pressBackspace();
    }
  }
  /**
   * @function doubleClick
   * @memberOf ui5.userInteraction
   * @description Double Clicks on the passed element.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.userInteraction.doubleClick(selector);
   */
  this.doubleClick = async function (selector, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    let elem = null;
    await browser.waitUntil(async function () {
      elem = await ui5.element.getDisplayed(selector, index, timeout);
      if (!elem) return false;
      return elem.isClickable();
    }, {
      timeout,
      timeoutMsg: `Element not clickable after ${timeout / 1000}s`
    });
    try {
      await elem.doubleClick();
    } catch (error) {
      const errorMessage = await util.function.mapWdioErrorToQmateErrorMessage(error, "doubleClick");
      throw new Error(errorMessage);
    }
  };

  /**
   * @function rightClick
   * @memberOf ui5.userInteraction
   * @description Right Clicks on the passed element.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example const elem = await nonUi5.element.getById("button01");
   * await ui5.userInteraction.rightClick(elem);
   */
  this.rightClick = async function (selector, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    let elem = null;
    await browser.waitUntil(async function () {
      elem = await ui5.element.getDisplayed(selector, index, timeout);
      if (!elem) return false;
      return elem.isClickable();
    }, {
      timeout,
      timeoutMsg: `Element not clickable after ${timeout / 1000}s`
    });
    try {
      await elem.click({
        button: "right"
      });
    } catch (error) {
      const errorMessage = await util.function.mapWdioErrorToQmateErrorMessage(error, "rightClick");
      throw new Error(errorMessage);
    }
  };

  // Disabled since it is not working correctly
  // /**
  //  * @function dragAndDrop
  //  * @memberOf ui5.userInteraction
  //  * @description Drags and drops the given element to the given target element.
  //  * @param {Object} sourceSelector - The selector describing the source element to drag.
  //  * @param {Object} targetSelector - The selector describing the target to drop the source element.
  //  * @param {Number} [sourceIndex=0] - The index of the source selector.  
  //  * @param {Number} [targetIndex=0] - The index of the target selector. 
  //  * @param {Number} [duration=3000] - The duration of the drag and drop (ms).
  //  * @param {Number} [timeout=30000] - The timeout to wait (ms).
  //  * @example await ui5.userInteraction.dragAndDrop(sourceSelector, targetSelector);
  //  */
  // this.dragAndDrop = async function (sourceSelector, targetSelector, sourceIndex = 0, targetIndex = 0, duration = 3000, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
  //   const sourceElement = await ui5.element.getDisplayed(sourceSelector, sourceIndex, timeout);
  //   const targetElement = await ui5.element.getDisplayed(targetSelector, targetIndex, timeout);
  //   await nonUi5.userInteraction.dragAndDrop(sourceElement, targetElement);
  // };
};
module.exports = new UserInteraction();