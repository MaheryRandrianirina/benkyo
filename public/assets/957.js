"use strict";(self.webpackChunkwebpack_demo=self.webpackChunkwebpack_demo||[]).push([[957],{106:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n// EXPORTS\n__webpack_require__.d(__webpack_exports__, {\n  \"default\": () => (/* binding */ generateCalendarFunc)\n});\n\n;// CONCATENATED MODULE: ./src/addLine.js\nfunction addLine(number) {\n  var tr = document.createElement('tr');\n  var removeLine = document.querySelector('.remove-line');\n  var addLineButton = document.querySelector('.add-line');\n  var addButtonContainer = addLineButton.parentElement;\n  var subjectLine = addLineButton.parentElement.parentElement;\n  var generateCalendarButton = subjectLine.querySelector('.generate-calendar');\n  var generateCalendarButtonContainer = generateCalendarButton.parentElement;\n  var calendarCreationTbody = document.querySelector('.calendar-creation-tbody');\n  tr.className = 'subject-line'; //on supprime le bouton\n\n  subjectLine.removeChild(addButtonContainer);\n  subjectLine.removeChild(generateCalendarButtonContainer);\n\n  if (removeLine !== null) {\n    removeLine.parentElement.parentElement.removeChild(removeLine.parentElement);\n  }\n\n  calendarCreationTbody.appendChild(tr);\n  tr.innerHTML = \"\\n    <td><input type='text' name='subject-\".concat(number, \"' id='subject-input'></td>\\n    <td><input type='text' name='chapter-\").concat(number, \"' id='chapter-input'></td>\\n    <td><input type='date' name='date-\").concat(number, \"' id='date-input'></td>\\n    <td><input type='time' name='hour-\").concat(number, \"' id='hour-input'></td>\\n    <td><i class='fas fa-plus add-line'></i></td>\\n    <td><i class='fas fa-check generate-calendar'></i></td>\\n    <td><i class='fas fa-window-close remove-line'></i></td>\\n    \"); //on reassigne une valeur à removeLine car une ligne vient d'être ajouté et elle pouvait être vide au début\n\n  removeLine = document.querySelector('.remove-line');\n\n  if (removeLine !== null) {\n    removeLine.addEventListener('click', function () {\n      var removeButton = removeLine.parentElement;\n      removeButton.parentElement.classList.add('invisible-subject-line');\n      removeButton.parentElement.addEventListener('animationend', function () {\n        calendarCreationTbody.removeChild(removeButton.parentElement);\n        calendarCreationTbody.lastElementChild.appendChild(addButtonContainer);\n        calendarCreationTbody.lastElementChild.appendChild(generateCalendarButtonContainer);\n\n        if (calendarCreationTbody.firstElementChild !== calendarCreationTbody.lastElementChild) {\n          calendarCreationTbody.lastElementChild.appendChild(removeButton);\n        }\n      });\n    });\n  }\n}\n// EXTERNAL MODULE: ./src/createElement.js\nvar createElement = __webpack_require__(995);\n;// CONCATENATED MODULE: ./src/generateRepetitionsCalendar.js\n\n\nfunction generateRepetitionsCalendar(nb, element) {\n  var number = nb;\n  var elementInputs = element.querySelectorAll('input');\n  var emptyInputExists = false;\n  elementInputs.forEach(function (i) {\n    if (i.value === '') {\n      emptyInputExists = true;\n    }\n  });\n\n  if (!emptyInputExists) {\n    number++;\n    addLine(number);\n    generateLines(element);\n  } else {\n    if (document.querySelector('.warning') === null) {\n      createWarning(\"Impossible de générer les répétitions si les champs sont vides.\");\n    }\n  }\n}\n/**\r\n * génère des lignes d'inputs d'une matière à reviser\r\n * @param {HTMLElement} element\r\n */\n\nfunction generateLines(element) {\n  var tbody = document.querySelector('tbody'); //lastElementChild représente le dernier element qui vient d'être ajouté\n\n  var subjectInput = tbody.lastElementChild.querySelector('#subject-input');\n  var chapterInput = tbody.lastElementChild.querySelector('#chapter-input');\n  var dateInput = tbody.lastElementChild.querySelector('#date-input');\n  var hourInput = tbody.lastElementChild.querySelector('#hour-input');\n  subjectInput.value = element.querySelector('#subject-input').value;\n  chapterInput.value = element.querySelector('#chapter-input').value;\n  var splittedHour = element.querySelector('#hour-input').value.split(':');\n  var splittedDate = element.querySelector('#date-input').value.split('-');\n  var year = splittedDate[0];\n  var month = splittedDate[1];\n  var day = splittedDate[2];\n  var newHourValue = parseInt(splittedHour[0]) + 8;\n\n  if (newHourValue < 20) {\n    dateInput.value = element.querySelector('#date-input').value;\n    hourInput.value = newHourValue + ':' + splittedHour[1];\n  } else {\n    var newDayValue = parseInt(day) + 1;\n    newHourValue = 8;\n    dateInput.value = year + '-' + month + '-' + newDayValue;\n\n    if (dateInput.value === '') {\n      if (parseInt(month) < 12) {\n        dateInput.value = year + '-' + (parseInt(month) + 1) + '-' + '01';\n      } else {\n        dateInput.value = parseInt(year) + 1 + '-' + '01' + '-' + '01';\n      }\n    }\n\n    hourInput.value = '0' + newHourValue + ':' + splittedHour[1];\n  }\n}\n/**\r\n * crée un message warnig\r\n * @param {string} message \r\n */\n\n\nfunction createWarning(message) {\n  var p = (0,createElement/* default */.Z)('p', 'warning');\n  var i = (0,createElement/* default */.Z)('i', 'fas fa-exclamation-triangle');\n  var span = (0,createElement/* default */.Z)('span', 'warnig-message');\n  document.querySelector('.content').appendChild(p);\n  p.appendChild(i);\n  p.appendChild(span);\n  span.innerHTML = message;\n}\n;// CONCATENATED MODULE: ./src/generateCalendar.js\n\nvar tbody;\nfunction generateCalendarFunc(e) {\n  tbody = document.querySelector('.calendar-creation-tbody'); //contient les tous les tr\n\n  var subjectsLines = Array.from(document.querySelectorAll('.subject-line')); // nécessaire pour différencier le \"name\" d'un input. Il sera incrémenté à chaque fois qu'il y a une nouvelle ligne\n\n  var number = subjectsLines.length; //contient les inputs dont la la revision est de type exercice\n\n  var isExercise = []; //contient les td qui contiennent les inputs\n\n  var inputsContainer = []; //contient les inputs eux-mêmes\n\n  var inputs = []; //contient tous les input de type date\n\n  var dateInputs = []; //contient tous les input qui ont la même date\n\n  var inputsWithSameDate = {}; //contient toutes les lignes(tr) qui ont la même date et heure où l'on trouvera ceux dont la date devrait être rajoutée +2\n\n  var newLineWithSameDate = {};\n  var sameDate = {}; //0 si l'utilsateur a fait une erreur de remplissage d'emploi du temps (quotas 3 leçons / j)\n\n  var isWarning = 0;\n  /**\r\n   * contient les elements à repeter\r\n   * @var toRepeat {}\r\n   */\n\n  var toRepeat = {};\n  subjectsLines.forEach(function (line) {\n    inputsContainer.push(line.querySelectorAll('input'));\n  });\n  inputsContainer.forEach(function (lineInputs) {\n    lineInputs.forEach(function (lineinput) {\n      inputs.push(lineinput);\n    });\n  });\n\n  for (var x = 0; x < inputs.length; x++) {\n    if (inputs[x].id === \"date-input\") {\n      dateInputs.push(inputs[x]);\n    }\n  }\n\n  for (var _n = 0; _n < dateInputs.length; _n++) {\n    // si l'element n + 1 du tableau existe (cad on est toujours dans le tableau)\n    if (dateInputs[_n + 1] !== undefined) {\n      //si les 2 elements qui se suivent ont les mêmes valeurs\n      if (dateInputs[_n].value === dateInputs[_n + 1].value) {\n        /*s'il n'existe pas encore aucun tableau contenant les elements avec les mêmes valeurs(date),\r\n        on le crée puis on push les elements qui se suivent. Sinon on push seulement la prochaine element\r\n        */\n        if (inputsWithSameDate[dateInputs[_n].value] === undefined) {\n          inputsWithSameDate[dateInputs[_n].value] = [];\n\n          inputsWithSameDate[dateInputs[_n].value].push(dateInputs[_n]);\n\n          inputsWithSameDate[dateInputs[_n].value].push(dateInputs[_n + 1]);\n        } else {\n          inputsWithSameDate[dateInputs[_n].value].push(dateInputs[_n + 1]);\n        }\n      } else {\n        if (inputsWithSameDate[dateInputs[_n].value] === undefined) {\n          inputsWithSameDate[dateInputs[_n].value] = [];\n\n          inputsWithSameDate[dateInputs[_n].value].push(dateInputs[_n]);\n        } else {\n          if (inputsWithSameDate[dateInputs[_n + 1].value] === undefined) {\n            inputsWithSameDate[dateInputs[_n + 1].value] = [];\n\n            inputsWithSameDate[dateInputs[_n + 1].value].push(dateInputs[_n + 1]);\n          }\n        }\n      }\n    } else {\n      if (inputsWithSameDate[dateInputs[_n].value] === undefined) {\n        inputsWithSameDate[dateInputs[_n].value] = [];\n\n        inputsWithSameDate[dateInputs[_n].value].push(dateInputs[_n]);\n      }\n    }\n  }\n\n  var n = 0;\n\n  var _loop = function _loop(date) {\n    inputsWithSameDate[date].forEach(function (input) {\n      var parent = input.parentElement.parentElement;\n      var chapterInput = parent.querySelector('#chapter-input');\n\n      if (chapterInput.value.includes(\"exercice\")) {\n        n++;\n        isExercise[date] = n;\n      } else {\n        // si le tableau n'exsite pas encore, on le crée\n        if (toRepeat[date] === undefined) {\n          toRepeat[date] = [];\n        } //dans tous les cas on push\n\n\n        toRepeat[date].push(chapterInput.parentElement.parentElement);\n      }\n    });\n  };\n\n  for (var date in inputsWithSameDate) {\n    _loop(date);\n  }\n\n  for (var d in inputsWithSameDate) {\n    if (inputsWithSameDate[d].length < 4) {\n      toRepeat[d].forEach(function (element) {\n        generateRepetitionsCalendar(number, element);\n      });\n    }\n\n    switch (inputsWithSameDate[d].length) {\n      case 4:\n        if (isExercise[d] >= 1) {\n          if (isWarning === 0) {\n            toRepeat[d].forEach(function (element) {\n              generateRepetitionsCalendar(number, element);\n            });\n          }\n        } else {\n          isWarning = 1;\n          focusOnElementsAfterWarning(toRepeat[d]);\n          createWarning(\"Erreur du quota 3 matières/j. Il faut au moins que l'une d'entre elles soient un exercice.\");\n        }\n\n        break;\n\n      case 5:\n        if (isExercise[d] >= 2) {\n          if (isWarning === 0) {\n            toRepeat[d].forEach(function (element) {\n              generateRepetitionsCalendar(number, element);\n            });\n          }\n        } else {\n          isWarning++;\n          focusOnElementsAfterWarning(toRepeat[d]);\n          createWarning(\"Erreur du quota 3 matières/j. Il faut au moins que deux d'entre elles soient un exercice.\");\n        }\n\n        break;\n    }\n  } //mise à jour de subjectLines car de nouveaux elements ont été rajoutés \n\n\n  subjectsLines = tbody.querySelectorAll('tr');\n  subjectsLines.forEach(function (line) {\n    var date = line.querySelector('#date-input').value;\n    var hour = line.querySelector('#hour-input').value;\n\n    if (sameDate[date] === undefined) {\n      sameDate[date] = [];\n    }\n\n    if (newLineWithSameDate[date + hour] === undefined) {\n      newLineWithSameDate[date + hour] = [];\n    }\n\n    newLineWithSameDate[date + hour].push(line);\n    sameDate[date].push(line);\n  }); // cas où plusieurs revisions sont dans la même heure\n\n  SpaceEveryRevisionIfTimesAreSemblables(newLineWithSameDate); // cas où l'espace entre plusieurs revisions de la même journée est  < 2h\n\n  SpaceEveryRevisionIfTimesAreSemblables(sameDate, true);\n}\n/**\r\n * focus sur les elements dont l'un ou plusieurs d'entre eux doivent être un exercice\r\n * @param {Array} toRepeatElements element tr où trouver l'element à focus\r\n */\n\nfunction focusOnElementsAfterWarning(toRepeatElements) {\n  toRepeatElements.forEach(function (el) {\n    el.querySelector('#chapter-input').classList.add('focus-for-warning');\n  });\n}\n/**\r\n * Ajuste l'heure en ajoutant 2 ou 1h de plus selon le cas s'il existe plusieurs revision à la même heure \r\n * ou l'espace entre 2 revisions fait moins de 2h\r\n * @param {{key: []}} ObjectToLoop \r\n * @param {{lastHour: number, lastHourInput: HTMLInputElement | undefined}} OptionsForUnderTwoHourSpacement \r\n */\n\n\nfunction SpaceEveryRevisionIfTimesAreSemblables(ObjectToLoop) {\n  var OptionsForUnderTwoHourSpacement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n  var lastHour = 0;\n  var lastHourInput;\n\n  for (var date in ObjectToLoop) {\n    var length = ObjectToLoop[date].length;\n\n    if (length > 1) {\n      for (var i = 0; i < length; i++) {\n        var hour = ObjectToLoop[date][i].querySelector('#hour-input');\n        var arrayFromHour = hour.value.split(':');\n        var hourValue = parseInt(arrayFromHour[0]);\n\n        if (!OptionsForUnderTwoHourSpacement) {\n          if (i >= Math.floor(length / 2)) {\n            AddNewHourValue({\n              hourValue: hourValue,\n              valueToAdd: 2\n            }, hour, arrayFromHour[1]);\n          }\n        } else {\n          console.log(ObjectToLoop);\n\n          if (lastHour > 0) {\n            console.log(hourValue + '---' + lastHour);\n\n            if (hourValue > lastHour) {\n              if (hourValue - lastHour < 2 && hourValue - lastHour > 0) {\n                AddNewHourValue({\n                  hourValue: hourValue,\n                  valueToAdd: 1\n                }, hour, arrayFromHour[1]);\n              }\n            } else if (lastHour > hourValue) {\n              if (lastHour - hourValue < 2 && lastHour - hourValue > 0) {\n                console.log('under 2h 2');\n                AddNewHourValue({\n                  hourValue: lastHour,\n                  valueToAdd: 1\n                }, lastHourInput, arrayFromHour[1]);\n              }\n            }\n          }\n\n          lastHour = hourValue;\n          lastHourInput = hour;\n        }\n      }\n    }\n  }\n}\n/**\r\n * Rajoute la nouvelle valeur de l'heure de revision pour chaqun suivant la fonction SpaceEveryRevisionIfTimesAreSemblables\r\n * @param {{hourValue: number, valueToAdd: number}} hourProperties \r\n * @param {HTMLInputElement} hourInput \r\n * @param {number} minutes \r\n */\n\n\nfunction AddNewHourValue(hourProperties, hourInput, minutes) {\n  var newHour = hourProperties.hourValue + hourProperties.valueToAdd;\n  console.log(hourInput);\n  hourInput.value = newHour + ':' + minutes;\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTA2LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBRUE7O0FBV0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7OztBQ2pEQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRkE7QUFFQTtBQUVBO0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBOztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQXBGQTtBQXNGQTtBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBdEdBOztBQXFGQTtBQUFBO0FBa0JBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUEzQkE7QUE2QkE7OztBQUVBO0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQUdBOztBQUlBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUFBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9hZGRMaW5lLmpzP2E2MmQiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2dlbmVyYXRlUmVwZXRpdGlvbnNDYWxlbmRhci5qcz8yMmY0Iiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9nZW5lcmF0ZUNhbGVuZGFyLmpzPzk3MjUiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkTGluZSAobnVtYmVyKXtcclxuICAgIGxldCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJylcclxuICAgIGxldCByZW1vdmVMaW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlbW92ZS1saW5lJylcclxuICAgIGxldCBhZGRMaW5lQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1saW5lJylcclxuICAgIGxldCBhZGRCdXR0b25Db250YWluZXIgPSBhZGRMaW5lQnV0dG9uLnBhcmVudEVsZW1lbnRcclxuICAgIGxldCBzdWJqZWN0TGluZSA9IGFkZExpbmVCdXR0b24ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XHJcbiAgICBsZXQgZ2VuZXJhdGVDYWxlbmRhckJ1dHRvbiA9IHN1YmplY3RMaW5lLnF1ZXJ5U2VsZWN0b3IoJy5nZW5lcmF0ZS1jYWxlbmRhcicpXHJcbiAgICBsZXQgZ2VuZXJhdGVDYWxlbmRhckJ1dHRvbkNvbnRhaW5lciA9IGdlbmVyYXRlQ2FsZW5kYXJCdXR0b24ucGFyZW50RWxlbWVudFxyXG4gICAgbGV0IGNhbGVuZGFyQ3JlYXRpb25UYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYWxlbmRhci1jcmVhdGlvbi10Ym9keScpXHJcbiAgICB0ci5jbGFzc05hbWUgPSAnc3ViamVjdC1saW5lJ1xyXG5cclxuICAgIC8vb24gc3VwcHJpbWUgbGUgYm91dG9uXHJcbiAgICBzdWJqZWN0TGluZS5yZW1vdmVDaGlsZChhZGRCdXR0b25Db250YWluZXIpXHJcbiAgICBzdWJqZWN0TGluZS5yZW1vdmVDaGlsZChnZW5lcmF0ZUNhbGVuZGFyQnV0dG9uQ29udGFpbmVyKVxyXG4gICAgXHJcbiAgICBpZihyZW1vdmVMaW5lICE9PSBudWxsKXtcclxuICAgIHJlbW92ZUxpbmUucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHJlbW92ZUxpbmUucGFyZW50RWxlbWVudCkgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNhbGVuZGFyQ3JlYXRpb25UYm9keS5hcHBlbmRDaGlsZCh0cilcclxuICAgIFxyXG4gICAgdHIuaW5uZXJIVE1MID0gYFxyXG4gICAgPHRkPjxpbnB1dCB0eXBlPSd0ZXh0JyBuYW1lPSdzdWJqZWN0LSR7bnVtYmVyfScgaWQ9J3N1YmplY3QtaW5wdXQnPjwvdGQ+XHJcbiAgICA8dGQ+PGlucHV0IHR5cGU9J3RleHQnIG5hbWU9J2NoYXB0ZXItJHtudW1iZXJ9JyBpZD0nY2hhcHRlci1pbnB1dCc+PC90ZD5cclxuICAgIDx0ZD48aW5wdXQgdHlwZT0nZGF0ZScgbmFtZT0nZGF0ZS0ke251bWJlcn0nIGlkPSdkYXRlLWlucHV0Jz48L3RkPlxyXG4gICAgPHRkPjxpbnB1dCB0eXBlPSd0aW1lJyBuYW1lPSdob3VyLSR7bnVtYmVyfScgaWQ9J2hvdXItaW5wdXQnPjwvdGQ+XHJcbiAgICA8dGQ+PGkgY2xhc3M9J2ZhcyBmYS1wbHVzIGFkZC1saW5lJz48L2k+PC90ZD5cclxuICAgIDx0ZD48aSBjbGFzcz0nZmFzIGZhLWNoZWNrIGdlbmVyYXRlLWNhbGVuZGFyJz48L2k+PC90ZD5cclxuICAgIDx0ZD48aSBjbGFzcz0nZmFzIGZhLXdpbmRvdy1jbG9zZSByZW1vdmUtbGluZSc+PC9pPjwvdGQ+XHJcbiAgICBgXHJcbiAgICBcclxuICAgIC8vb24gcmVhc3NpZ25lIHVuZSB2YWxldXIgw6AgcmVtb3ZlTGluZSBjYXIgdW5lIGxpZ25lIHZpZW50IGQnw6p0cmUgYWpvdXTDqSBldCBlbGxlIHBvdXZhaXQgw6p0cmUgdmlkZSBhdSBkw6lidXRcclxuICAgIHJlbW92ZUxpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVtb3ZlLWxpbmUnKVxyXG4gICAgaWYocmVtb3ZlTGluZSAhPT0gbnVsbCl7XHJcbiAgICAgICAgcmVtb3ZlTGluZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZUJ1dHRvbiA9IHJlbW92ZUxpbmUucGFyZW50RWxlbWVudFxyXG4gICAgICAgICAgICByZW1vdmVCdXR0b24ucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUtc3ViamVjdC1saW5lJylcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJlbW92ZUJ1dHRvbi5wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsICgpPT57XHJcbiAgICAgICAgICAgICAgICBjYWxlbmRhckNyZWF0aW9uVGJvZHkucmVtb3ZlQ2hpbGQocmVtb3ZlQnV0dG9uLnBhcmVudEVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICBjYWxlbmRhckNyZWF0aW9uVGJvZHkubGFzdEVsZW1lbnRDaGlsZC5hcHBlbmRDaGlsZChhZGRCdXR0b25Db250YWluZXIpXHJcbiAgICAgICAgICAgICAgICBjYWxlbmRhckNyZWF0aW9uVGJvZHkubGFzdEVsZW1lbnRDaGlsZC5hcHBlbmRDaGlsZChnZW5lcmF0ZUNhbGVuZGFyQnV0dG9uQ29udGFpbmVyKVxyXG4gICAgICAgICAgICAgICAgaWYoY2FsZW5kYXJDcmVhdGlvblRib2R5LmZpcnN0RWxlbWVudENoaWxkICE9PSBjYWxlbmRhckNyZWF0aW9uVGJvZHkubGFzdEVsZW1lbnRDaGlsZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsZW5kYXJDcmVhdGlvblRib2R5Lmxhc3RFbGVtZW50Q2hpbGQuYXBwZW5kQ2hpbGQocmVtb3ZlQnV0dG9uKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgXHJcbn0iLCJpbXBvcnQgYWRkTGluZSBmcm9tIFwiLi9hZGRMaW5lXCJcclxuaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSBcIi4vY3JlYXRlRWxlbWVudFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZW5lcmF0ZVJlcGV0aXRpb25zQ2FsZW5kYXIobmIsIGVsZW1lbnQpe1xyXG4gICAgbGV0IG51bWJlciA9IG5iXHJcbiAgICBsZXQgZWxlbWVudElucHV0cyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKVxyXG4gICAgbGV0IGVtcHR5SW5wdXRFeGlzdHMgPSBmYWxzZVxyXG4gICAgZWxlbWVudElucHV0cy5mb3JFYWNoKGkgPT4ge1xyXG4gICAgICAgIGlmKGkudmFsdWUgPT09ICcnKXtcclxuICAgICAgICAgICAgZW1wdHlJbnB1dEV4aXN0cyA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgaWYoIWVtcHR5SW5wdXRFeGlzdHMpe1xyXG4gICAgICAgIG51bWJlcisrXHJcbiAgICAgICAgYWRkTGluZShudW1iZXIpXHJcbiAgICAgICAgZ2VuZXJhdGVMaW5lcyhlbGVtZW50KVxyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndhcm5pbmcnKSA9PT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGNyZWF0ZVdhcm5pbmcoXCJJbXBvc3NpYmxlIGRlIGfDqW7DqXJlciBsZXMgcsOpcMOpdGl0aW9ucyBzaSBsZXMgY2hhbXBzIHNvbnQgdmlkZXMuXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIGfDqW7DqHJlIGRlcyBsaWduZXMgZCdpbnB1dHMgZCd1bmUgbWF0acOocmUgw6AgcmV2aXNlclxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcbiAqL1xyXG4gZnVuY3Rpb24gZ2VuZXJhdGVMaW5lcyhlbGVtZW50KXtcclxuICAgIGxldCB0Ym9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3Rib2R5JylcclxuICAgIC8vbGFzdEVsZW1lbnRDaGlsZCByZXByw6lzZW50ZSBsZSBkZXJuaWVyIGVsZW1lbnQgcXVpIHZpZW50IGQnw6p0cmUgYWpvdXTDqVxyXG4gICAgbGV0IHN1YmplY3RJbnB1dCA9IHRib2R5Lmxhc3RFbGVtZW50Q2hpbGQucXVlcnlTZWxlY3RvcignI3N1YmplY3QtaW5wdXQnKVxyXG4gICAgbGV0IGNoYXB0ZXJJbnB1dCA9IHRib2R5Lmxhc3RFbGVtZW50Q2hpbGQucXVlcnlTZWxlY3RvcignI2NoYXB0ZXItaW5wdXQnKVxyXG4gICAgbGV0IGRhdGVJbnB1dCA9IHRib2R5Lmxhc3RFbGVtZW50Q2hpbGQucXVlcnlTZWxlY3RvcignI2RhdGUtaW5wdXQnKVxyXG4gICAgbGV0IGhvdXJJbnB1dCA9IHRib2R5Lmxhc3RFbGVtZW50Q2hpbGQucXVlcnlTZWxlY3RvcignI2hvdXItaW5wdXQnKVxyXG5cclxuICAgIHN1YmplY3RJbnB1dC52YWx1ZSA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignI3N1YmplY3QtaW5wdXQnKS52YWx1ZVxyXG4gICAgY2hhcHRlcklucHV0LnZhbHVlID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhcHRlci1pbnB1dCcpLnZhbHVlXHJcbiAgICBcclxuICAgIGxldCBzcGxpdHRlZEhvdXIgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNob3VyLWlucHV0JykudmFsdWUuc3BsaXQoJzonKVxyXG4gICAgbGV0IHNwbGl0dGVkRGF0ZSA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignI2RhdGUtaW5wdXQnKS52YWx1ZS5zcGxpdCgnLScpXHJcbiAgICBcclxuICAgIGxldCB5ZWFyID0gc3BsaXR0ZWREYXRlWzBdXHJcbiAgICBsZXQgbW9udGggPSBzcGxpdHRlZERhdGVbMV1cclxuICAgIGxldCBkYXkgPSAgc3BsaXR0ZWREYXRlWzJdXHJcbiAgICBsZXQgbmV3SG91clZhbHVlID0gcGFyc2VJbnQoc3BsaXR0ZWRIb3VyWzBdKSArIDhcclxuICAgIFxyXG4gICAgaWYobmV3SG91clZhbHVlIDwgMjApe1xyXG4gICAgICAgIGRhdGVJbnB1dC52YWx1ZSA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignI2RhdGUtaW5wdXQnKS52YWx1ZVxyXG4gICAgICAgIGhvdXJJbnB1dC52YWx1ZSA9IG5ld0hvdXJWYWx1ZSArICc6JyArIHNwbGl0dGVkSG91clsxXVxyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgbGV0IG5ld0RheVZhbHVlID0gcGFyc2VJbnQoZGF5KSArIDFcclxuICAgICAgICBuZXdIb3VyVmFsdWUgPSA4XHJcbiAgICAgICAgZGF0ZUlucHV0LnZhbHVlID0geWVhciArICctJyArIG1vbnRoICsgJy0nICsgbmV3RGF5VmFsdWVcclxuXHJcbiAgICAgICAgaWYoZGF0ZUlucHV0LnZhbHVlID09PSAnJyl7XHJcbiAgICAgICAgICAgIGlmKHBhcnNlSW50KG1vbnRoKSA8IDEyKXtcclxuICAgICAgICAgICAgICAgIGRhdGVJbnB1dC52YWx1ZSA9IHllYXIgKyAnLScgKyAocGFyc2VJbnQobW9udGgpICsgMSkgKyAnLScgKyAnMDEnXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZGF0ZUlucHV0LnZhbHVlID0gKHBhcnNlSW50KHllYXIpICsgMSkgKyAnLScgKyAnMDEnICsgJy0nICsgJzAxJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBob3VySW5wdXQudmFsdWUgPSAnMCcgKyBuZXdIb3VyVmFsdWUgKyAnOicgKyBzcGxpdHRlZEhvdXJbMV1cclxuICAgIH0gICBcclxufVxyXG4vKipcclxuICogY3LDqWUgdW4gbWVzc2FnZSB3YXJuaWdcclxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV2FybmluZyhtZXNzYWdlKXtcclxuICAgIFxyXG4gICAgbGV0IHAgPSBjcmVhdGVFbGVtZW50KCdwJywgJ3dhcm5pbmcnKVxyXG4gICAgbGV0IGkgPSBjcmVhdGVFbGVtZW50KCdpJywgJ2ZhcyBmYS1leGNsYW1hdGlvbi10cmlhbmdsZScpXHJcbiAgICBsZXQgc3BhbiA9IGNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCAnd2FybmlnLW1lc3NhZ2UnKVxyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50JykuYXBwZW5kQ2hpbGQocClcclxuICAgIHAuYXBwZW5kQ2hpbGQoaSlcclxuICAgIHAuYXBwZW5kQ2hpbGQoc3BhbilcclxuICAgIHNwYW4uaW5uZXJIVE1MID0gbWVzc2FnZVxyXG59XHJcbiIsImltcG9ydCBnZW5lcmF0ZVJlcGV0aXRpb25zQ2FsZW5kYXIsIHsgY3JlYXRlV2FybmluZyB9IGZyb20gXCIuL2dlbmVyYXRlUmVwZXRpdGlvbnNDYWxlbmRhclwiXHJcblxyXG5sZXQgdGJvZHlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdlbmVyYXRlQ2FsZW5kYXJGdW5jKGUpe1xyXG4gICAgXHJcbiAgICB0Ym9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYWxlbmRhci1jcmVhdGlvbi10Ym9keScpXHJcbiAgICAvL2NvbnRpZW50IGxlcyB0b3VzIGxlcyB0clxyXG4gICAgbGV0IHN1YmplY3RzTGluZXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdWJqZWN0LWxpbmUnKSlcclxuICAgIC8vIG7DqWNlc3NhaXJlIHBvdXIgZGlmZsOpcmVuY2llciBsZSBcIm5hbWVcIiBkJ3VuIGlucHV0LiBJbCBzZXJhIGluY3LDqW1lbnTDqSDDoCBjaGFxdWUgZm9pcyBxdSdpbCB5IGEgdW5lIG5vdXZlbGxlIGxpZ25lXHJcbiAgICBsZXQgbnVtYmVyID0gc3ViamVjdHNMaW5lcy5sZW5ndGhcclxuICAgIC8vY29udGllbnQgbGVzIGlucHV0cyBkb250IGxhIGxhIHJldmlzaW9uIGVzdCBkZSB0eXBlIGV4ZXJjaWNlXHJcbiAgICBsZXQgaXNFeGVyY2lzZSA9IFtdXHJcbiAgICAvL2NvbnRpZW50IGxlcyB0ZCBxdWkgY29udGllbm5lbnQgbGVzIGlucHV0c1xyXG4gICAgbGV0IGlucHV0c0NvbnRhaW5lciA9IFtdXHJcbiAgICAvL2NvbnRpZW50IGxlcyBpbnB1dHMgZXV4LW3Dqm1lc1xyXG4gICAgbGV0IGlucHV0cyA9IFtdXHJcbiAgICAvL2NvbnRpZW50IHRvdXMgbGVzIGlucHV0IGRlIHR5cGUgZGF0ZVxyXG4gICAgbGV0IGRhdGVJbnB1dHMgPSBbXVxyXG4gICAgLy9jb250aWVudCB0b3VzIGxlcyBpbnB1dCBxdWkgb250IGxhIG3Dqm1lIGRhdGVcclxuICAgIGxldCBpbnB1dHNXaXRoU2FtZURhdGUgPSB7fVxyXG4gICAgLy9jb250aWVudCB0b3V0ZXMgbGVzIGxpZ25lcyh0cikgcXVpIG9udCBsYSBtw6ptZSBkYXRlIGV0IGhldXJlIG/DuSBsJ29uIHRyb3V2ZXJhIGNldXggZG9udCBsYSBkYXRlIGRldnJhaXQgw6p0cmUgcmFqb3V0w6llICsyXHJcbiAgICBsZXQgbmV3TGluZVdpdGhTYW1lRGF0ZSA9IHt9XHJcbiAgICBsZXQgc2FtZURhdGUgPSB7fVxyXG4gICAgLy8wIHNpIGwndXRpbHNhdGV1ciBhIGZhaXQgdW5lIGVycmV1ciBkZSByZW1wbGlzc2FnZSBkJ2VtcGxvaSBkdSB0ZW1wcyAocXVvdGFzIDMgbGXDp29ucyAvIGopXHJcbiAgICBsZXQgaXNXYXJuaW5nID0gMFxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBjb250aWVudCBsZXMgZWxlbWVudHMgw6AgcmVwZXRlclxyXG4gICAgICogQHZhciB0b1JlcGVhdCB7fVxyXG4gICAgICovXHJcbiAgICBsZXQgdG9SZXBlYXQgPSB7fVxyXG5cclxuICAgIHN1YmplY3RzTGluZXMuZm9yRWFjaChsaW5lID0+IHtcclxuICAgICAgICBpbnB1dHNDb250YWluZXIucHVzaChsaW5lLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0JykpICAgICAgICBcclxuICAgIH0pXHJcblxyXG4gICAgaW5wdXRzQ29udGFpbmVyLmZvckVhY2gobGluZUlucHV0cyA9PiB7XHJcbiAgICAgICAgbGluZUlucHV0cy5mb3JFYWNoKGxpbmVpbnB1dCA9PiB7XHJcbiAgICAgICAgICAgIGlucHV0cy5wdXNoKGxpbmVpbnB1dClcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAgXHJcbiAgICB9KVxyXG4gICAgXHJcbiAgICBmb3IobGV0IHggPSAwOyB4IDwgaW5wdXRzLmxlbmd0aDsgeCsrKXtcclxuICAgICAgICBpZihpbnB1dHNbeF0uaWQgPT09IFwiZGF0ZS1pbnB1dFwiKXtcclxuICAgICAgICAgICAgZGF0ZUlucHV0cy5wdXNoKGlucHV0c1t4XSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yKGxldCBuID0gMDsgbiA8IGRhdGVJbnB1dHMubGVuZ3RoOyBuKyspe1xyXG4gICAgICAgIC8vIHNpIGwnZWxlbWVudCBuICsgMSBkdSB0YWJsZWF1IGV4aXN0ZSAoY2FkIG9uIGVzdCB0b3Vqb3VycyBkYW5zIGxlIHRhYmxlYXUpXHJcbiAgICAgICAgaWYoZGF0ZUlucHV0c1tuICsgMV0gIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vc2kgbGVzIDIgZWxlbWVudHMgcXVpIHNlIHN1aXZlbnQgb250IGxlcyBtw6ptZXMgdmFsZXVyc1xyXG4gICAgICAgICAgICBpZihkYXRlSW5wdXRzW25dLnZhbHVlID09PSBkYXRlSW5wdXRzW24gKyAxXS52YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICAvKnMnaWwgbidleGlzdGUgcGFzIGVuY29yZSBhdWN1biB0YWJsZWF1IGNvbnRlbmFudCBsZXMgZWxlbWVudHMgYXZlYyBsZXMgbcOqbWVzIHZhbGV1cnMoZGF0ZSksXHJcbiAgICAgICAgICAgICAgICBvbiBsZSBjcsOpZSBwdWlzIG9uIHB1c2ggbGVzIGVsZW1lbnRzIHF1aSBzZSBzdWl2ZW50LiBTaW5vbiBvbiBwdXNoIHNldWxlbWVudCBsYSBwcm9jaGFpbmUgZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIGlmKGlucHV0c1dpdGhTYW1lRGF0ZVtkYXRlSW5wdXRzW25dLnZhbHVlXSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dHNXaXRoU2FtZURhdGVbZGF0ZUlucHV0c1tuXS52YWx1ZV0gPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0c1dpdGhTYW1lRGF0ZVtkYXRlSW5wdXRzW25dLnZhbHVlXS5wdXNoKGRhdGVJbnB1dHNbbl0pXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRzV2l0aFNhbWVEYXRlW2RhdGVJbnB1dHNbbl0udmFsdWVdLnB1c2goZGF0ZUlucHV0c1tuICsgMV0pXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dHNXaXRoU2FtZURhdGVbZGF0ZUlucHV0c1tuXS52YWx1ZV0ucHVzaChkYXRlSW5wdXRzW24gKyAxXSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKGlucHV0c1dpdGhTYW1lRGF0ZVtkYXRlSW5wdXRzW25dLnZhbHVlXSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dHNXaXRoU2FtZURhdGVbZGF0ZUlucHV0c1tuXS52YWx1ZV0gPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0c1dpdGhTYW1lRGF0ZVtkYXRlSW5wdXRzW25dLnZhbHVlXS5wdXNoKGRhdGVJbnB1dHNbbl0pXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZihpbnB1dHNXaXRoU2FtZURhdGVbZGF0ZUlucHV0c1tuICsgMV0udmFsdWVdID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dHNXaXRoU2FtZURhdGVbZGF0ZUlucHV0c1tuICsgMV0udmFsdWVdID0gW11cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRzV2l0aFNhbWVEYXRlW2RhdGVJbnB1dHNbbiArIDFdLnZhbHVlXS5wdXNoKGRhdGVJbnB1dHNbbiArIDFdKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKGlucHV0c1dpdGhTYW1lRGF0ZVtkYXRlSW5wdXRzW25dLnZhbHVlXSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGlucHV0c1dpdGhTYW1lRGF0ZVtkYXRlSW5wdXRzW25dLnZhbHVlXSA9IFtdXHJcbiAgICAgICAgICAgICAgICBpbnB1dHNXaXRoU2FtZURhdGVbZGF0ZUlucHV0c1tuXS52YWx1ZV0ucHVzaChkYXRlSW5wdXRzW25dKVxyXG4gICAgICAgICAgICB9ICBcclxuICAgICAgICB9IFxyXG4gICAgfVxyXG5cclxuICAgIGxldCBuID0gMFxyXG4gICAgZm9yKGxldCBkYXRlIGluIGlucHV0c1dpdGhTYW1lRGF0ZSl7XHJcbiAgICAgICAgaW5wdXRzV2l0aFNhbWVEYXRlW2RhdGVdLmZvckVhY2goaW5wdXQgPT4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHBhcmVudCA9IGlucHV0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxyXG4gICAgICAgICAgICBsZXQgY2hhcHRlcklucHV0ID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGFwdGVyLWlucHV0JylcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGNoYXB0ZXJJbnB1dC52YWx1ZS5pbmNsdWRlcyhcImV4ZXJjaWNlXCIpKXtcclxuICAgICAgICAgICAgICAgIG4rK1xyXG4gICAgICAgICAgICAgICAgaXNFeGVyY2lzZVtkYXRlXSA9IG5cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyBzaSBsZSB0YWJsZWF1IG4nZXhzaXRlIHBhcyBlbmNvcmUsIG9uIGxlIGNyw6llXHJcbiAgICAgICAgICAgICAgICBpZih0b1JlcGVhdFtkYXRlXSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICB0b1JlcGVhdFtkYXRlXSA9IFtdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2RhbnMgdG91cyBsZXMgY2FzIG9uIHB1c2hcclxuICAgICAgICAgICAgICAgIHRvUmVwZWF0W2RhdGVdLnB1c2goY2hhcHRlcklucHV0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZvcihsZXQgZCBpbiBpbnB1dHNXaXRoU2FtZURhdGUpe1xyXG4gICAgICAgIGlmKGlucHV0c1dpdGhTYW1lRGF0ZVtkXS5sZW5ndGggPCA0KXtcclxuICAgICAgICAgICAgdG9SZXBlYXRbZF0uZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGdlbmVyYXRlUmVwZXRpdGlvbnNDYWxlbmRhcihudW1iZXIsIGVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3dpdGNoKGlucHV0c1dpdGhTYW1lRGF0ZVtkXS5sZW5ndGgpe1xyXG5cclxuICAgICAgICAgICAgY2FzZSA0OiBcclxuICAgICAgICAgICAgICAgIGlmKGlzRXhlcmNpc2VbZF0gPj0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaXNXYXJuaW5nID09PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9SZXBlYXRbZF0uZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlUmVwZXRpdGlvbnNDYWxlbmRhcihudW1iZXIsIGVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNXYXJuaW5nID0gMVxyXG4gICAgICAgICAgICAgICAgICAgIGZvY3VzT25FbGVtZW50c0FmdGVyV2FybmluZyh0b1JlcGVhdFtkXSlcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVXYXJuaW5nKFwiRXJyZXVyIGR1IHF1b3RhIDMgbWF0acOocmVzL2ouIElsIGZhdXQgYXUgbW9pbnMgcXVlIGwndW5lIGQnZW50cmUgZWxsZXMgc29pZW50IHVuIGV4ZXJjaWNlLlwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgaWYoaXNFeGVyY2lzZVtkXSA+PSAyKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihpc1dhcm5pbmcgPT09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b1JlcGVhdFtkXS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVSZXBldGl0aW9uc0NhbGVuZGFyKG51bWJlciwgZWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpc1dhcm5pbmcrK1xyXG4gICAgICAgICAgICAgICAgICAgIGZvY3VzT25FbGVtZW50c0FmdGVyV2FybmluZyh0b1JlcGVhdFtkXSlcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVXYXJuaW5nKFwiRXJyZXVyIGR1IHF1b3RhIDMgbWF0acOocmVzL2ouIElsIGZhdXQgYXUgbW9pbnMgcXVlIGRldXggZCdlbnRyZSBlbGxlcyBzb2llbnQgdW4gZXhlcmNpY2UuXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhayAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vbWlzZSDDoCBqb3VyIGRlIHN1YmplY3RMaW5lcyBjYXIgZGUgbm91dmVhdXggZWxlbWVudHMgb250IMOpdMOpIHJham91dMOpcyBcclxuICAgIHN1YmplY3RzTGluZXMgPSB0Ym9keS5xdWVyeVNlbGVjdG9yQWxsKCd0cicpXHJcbiAgICBcclxuICAgIHN1YmplY3RzTGluZXMuZm9yRWFjaChsaW5lID0+IHtcclxuICAgICAgICBsZXQgZGF0ZSA9IGxpbmUucXVlcnlTZWxlY3RvcignI2RhdGUtaW5wdXQnKS52YWx1ZVxyXG4gICAgICAgIGxldCBob3VyID0gbGluZS5xdWVyeVNlbGVjdG9yKCcjaG91ci1pbnB1dCcpLnZhbHVlXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoc2FtZURhdGVbZGF0ZV0gPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHNhbWVEYXRlW2RhdGVdID0gW11cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYobmV3TGluZVdpdGhTYW1lRGF0ZVtkYXRlICsgaG91cl0gPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIG5ld0xpbmVXaXRoU2FtZURhdGVbZGF0ZSArIGhvdXJdID0gW11cclxuICAgICAgICB9XHJcbiAgICAgICAgbmV3TGluZVdpdGhTYW1lRGF0ZVtkYXRlICsgaG91cl0ucHVzaChsaW5lKSAgXHJcbiAgICAgICAgc2FtZURhdGVbZGF0ZV0ucHVzaChsaW5lKVxyXG4gICAgfSlcclxuICAgIFxyXG4gICAgLy8gY2FzIG/DuSBwbHVzaWV1cnMgcmV2aXNpb25zIHNvbnQgZGFucyBsYSBtw6ptZSBoZXVyZVxyXG4gICAgU3BhY2VFdmVyeVJldmlzaW9uSWZUaW1lc0FyZVNlbWJsYWJsZXMobmV3TGluZVdpdGhTYW1lRGF0ZSlcclxuXHJcbiAgICAvLyBjYXMgb8O5IGwnZXNwYWNlIGVudHJlIHBsdXNpZXVycyByZXZpc2lvbnMgZGUgbGEgbcOqbWUgam91cm7DqWUgZXN0ICA8IDJoXHJcbiAgICBcclxuICAgIFNwYWNlRXZlcnlSZXZpc2lvbklmVGltZXNBcmVTZW1ibGFibGVzKHNhbWVEYXRlLCB0cnVlKVxyXG4gICAgXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBmb2N1cyBzdXIgbGVzIGVsZW1lbnRzIGRvbnQgbCd1biBvdSBwbHVzaWV1cnMgZCdlbnRyZSBldXggZG9pdmVudCDDqnRyZSB1biBleGVyY2ljZVxyXG4gKiBAcGFyYW0ge0FycmF5fSB0b1JlcGVhdEVsZW1lbnRzIGVsZW1lbnQgdHIgb8O5IHRyb3V2ZXIgbCdlbGVtZW50IMOgIGZvY3VzXHJcbiAqL1xyXG4gZnVuY3Rpb24gZm9jdXNPbkVsZW1lbnRzQWZ0ZXJXYXJuaW5nKHRvUmVwZWF0RWxlbWVudHMpe1xyXG4gICAgdG9SZXBlYXRFbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICBlbC5xdWVyeVNlbGVjdG9yKCcjY2hhcHRlci1pbnB1dCcpLmNsYXNzTGlzdC5hZGQoJ2ZvY3VzLWZvci13YXJuaW5nJylcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBanVzdGUgbCdoZXVyZSBlbiBham91dGFudCAyIG91IDFoIGRlIHBsdXMgc2Vsb24gbGUgY2FzIHMnaWwgZXhpc3RlIHBsdXNpZXVycyByZXZpc2lvbiDDoCBsYSBtw6ptZSBoZXVyZSBcclxuICogb3UgbCdlc3BhY2UgZW50cmUgMiByZXZpc2lvbnMgZmFpdCBtb2lucyBkZSAyaFxyXG4gKiBAcGFyYW0ge3trZXk6IFtdfX0gT2JqZWN0VG9Mb29wIFxyXG4gKiBAcGFyYW0ge3tsYXN0SG91cjogbnVtYmVyLCBsYXN0SG91cklucHV0OiBIVE1MSW5wdXRFbGVtZW50IHwgdW5kZWZpbmVkfX0gT3B0aW9uc0ZvclVuZGVyVHdvSG91clNwYWNlbWVudCBcclxuICovXHJcbmZ1bmN0aW9uIFNwYWNlRXZlcnlSZXZpc2lvbklmVGltZXNBcmVTZW1ibGFibGVzKE9iamVjdFRvTG9vcCwgT3B0aW9uc0ZvclVuZGVyVHdvSG91clNwYWNlbWVudCA9IGZhbHNlKXtcclxuICAgIGxldCBsYXN0SG91ciA9IDBcclxuICAgIGxldCBsYXN0SG91cklucHV0XHJcbiAgICBmb3IobGV0IGRhdGUgaW4gT2JqZWN0VG9Mb29wKXtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSBPYmplY3RUb0xvb3BbZGF0ZV0ubGVuZ3RoXHJcblxyXG4gICAgICAgIGlmKGxlbmd0aCA+IDEpe1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGhvdXIgPSBPYmplY3RUb0xvb3BbZGF0ZV1baV0ucXVlcnlTZWxlY3RvcignI2hvdXItaW5wdXQnKVxyXG4gICAgICAgICAgICAgICAgbGV0IGFycmF5RnJvbUhvdXIgPSBob3VyLnZhbHVlLnNwbGl0KCc6JylcclxuICAgICAgICAgICAgICAgIGxldCBob3VyVmFsdWUgPSBwYXJzZUludChhcnJheUZyb21Ib3VyWzBdKVxyXG4gICAgICAgICAgICAgICAgaWYoIU9wdGlvbnNGb3JVbmRlclR3b0hvdXJTcGFjZW1lbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGkgPj0gTWF0aC5mbG9vcihsZW5ndGggLyAyKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFkZE5ld0hvdXJWYWx1ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3VyVmFsdWU6IGhvdXJWYWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlVG9BZGQ6IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgaG91ciwgYXJyYXlGcm9tSG91clsxXSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhPYmplY3RUb0xvb3ApXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGxhc3RIb3VyID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGhvdXJWYWx1ZSArICctLS0nICsgbGFzdEhvdXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdXJWYWx1ZSA+IGxhc3RIb3VyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoKGhvdXJWYWx1ZSAtIGxhc3RIb3VyKSA8IDIgJiYgKGhvdXJWYWx1ZSAtIGxhc3RIb3VyKSA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFkZE5ld0hvdXJWYWx1ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdXJWYWx1ZTogaG91clZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVRvQWRkOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgaG91ciwgYXJyYXlGcm9tSG91clsxXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYobGFzdEhvdXIgPiBob3VyVmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZigobGFzdEhvdXIgLSBob3VyVmFsdWUpIDwgMiAmJiAobGFzdEhvdXIgLSBob3VyVmFsdWUpID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3VuZGVyIDJoIDInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFkZE5ld0hvdXJWYWx1ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdXJWYWx1ZTogbGFzdEhvdXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlVG9BZGQ6IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBsYXN0SG91cklucHV0LCBhcnJheUZyb21Ib3VyWzFdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RIb3VyID0gaG91clZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdEhvdXJJbnB1dCA9IGhvdXJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmFqb3V0ZSBsYSBub3V2ZWxsZSB2YWxldXIgZGUgbCdoZXVyZSBkZSByZXZpc2lvbiBwb3VyIGNoYXF1biBzdWl2YW50IGxhIGZvbmN0aW9uIFNwYWNlRXZlcnlSZXZpc2lvbklmVGltZXNBcmVTZW1ibGFibGVzXHJcbiAqIEBwYXJhbSB7e2hvdXJWYWx1ZTogbnVtYmVyLCB2YWx1ZVRvQWRkOiBudW1iZXJ9fSBob3VyUHJvcGVydGllcyBcclxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBob3VySW5wdXQgXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBtaW51dGVzIFxyXG4gKi9cclxuZnVuY3Rpb24gQWRkTmV3SG91clZhbHVlKGhvdXJQcm9wZXJ0aWVzLCBob3VySW5wdXQsIG1pbnV0ZXMpe1xyXG4gICAgbGV0IG5ld0hvdXIgPSBob3VyUHJvcGVydGllcy5ob3VyVmFsdWUgKyBob3VyUHJvcGVydGllcy52YWx1ZVRvQWRkXHJcbiAgICBjb25zb2xlLmxvZyhob3VySW5wdXQpXHJcbiAgICBob3VySW5wdXQudmFsdWUgPSBuZXdIb3VyICsgJzonICsgbWludXRlc1xyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///106\n")}}]);