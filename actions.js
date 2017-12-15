/*
© Copyright IBM Corp. 2017
*/


'use strict';

// The expertise handler
const { handler } = require('./skill-sdk');
const poiAction = require('./actions/poi')

/*************************** Handler Functions ******************************
 *                                                                          *
 * ** converse -                                                            *
 *                                                                          *
 *  use this function to send a message to wcs                              *
 * @param request - the request to be sent to wcs                           *
 * @param response - the response variable to be returned to wpa            *
 * @returns result - the result from wcs                                    *
 *                                                                          *
 *                                                                          *
 * ** addToSkillContext -                                                   *
 *                                                                          *
 * Add variable to context                                                  *
 * @param varName - name of your context variable                           *
 * @param value - value of the the context variable                         *
 *                                                                          *
 * ** removeFromSkillContext -                                              *
 * Delete a variable from the context                                       *
 * @param varName - name of the variable to delete                          *
 *                                                                          *
 * ** getFromSkillContext -                                                 *
 * Get the value of a variable from the context                             *
 * @param varName - the name of the variable requested from the context     *
 * @returns the value of varName in the context                             *
 *                                                                          *
 * ** clearSkillContext -                                                   *
 * clears all the context                                                   *
 *                                                                          *
 ****************************************************************************/

// Expertise translations map
const languageResource = {
  'en-US': {
    'translation': {
      'RESTAURANT': 'Here are some restaurants:',
      'MEDICAL': 'Here are some healthcare facilities',
      'DOCTOR': 'Here are some doctors',
      'HOSPITAL': 'Here are some hospitals',
      'PHARMACY': 'Here are some pharmacies',
      'TRY_AGAIN': 'Sorry, please try again later'
    }
  },
  'de-DE': {
    'translation': {
      'RESTAURANT': '...',
      'MEDICAL': '...',
      'TRY_AGAIN': 'Sorry, bitte versuchen Sie es später noch einmal'
    }
  }
};

/**
 *  example callback function sent to the handler.converse function, change this function to suit your needs
 * @param result - request result from WCS
 * @param response - the response variable
 * @param err - error description in case of an error, otherwise undefined
 */
let converseCallback = function (result, response, err) {
  console.log('converseCallback');
  // this variable would preferably come from your wcs and decide whether the session has ended
  let deleteSkillSession = false;
  if (err) {
    response.say(handler.t('TRY_AGAIN')).send();
    console.error(err);
  }
  else {
    // example of adding a card
    // example of a card sent to the application, the action and the json most of the time will come from WCS
    response.card('some action', { "some": "json" });
    response.say(result.output.text, 'random').deleteSkillSession(deleteSkillSession).send();
  }
};

// Actions for DEFAULT state
const stateDefaultActions = handler.createActionsHandler({

  'restaurant': (request, response) => {
    poiAction('restaurant', request.attributes.location, 'RESTAURANT', handler, request, response);
  },
  'medical': (request, response) => {
    poiAction('health', '', 'MEDICAL', handler, request, response);
  },
  'hospital': (request, response) => {
    poiAction('hospital', '', 'HOSPITAL', handler, request, response);
  },
  'doctor': (request, response) => {
    poiAction('physicians', '', 'DOCTOR', handler, request, response);
  },
  'pharmacy': (request, response) => {
    poiAction('pharmacy', '', 'PHARMACY', handler, request, response);
  },
  'unhandled': (request, response) => {
    response.say(handler.t('TRY_AGAIN')).send();
  }

}, 'DEFAULT');

module.exports = () => {
  // Register language translations.
  handler.registerLanguages(languageResource);
  // Register state actions
  handler.registerActionsHandler(stateDefaultActions);
};
