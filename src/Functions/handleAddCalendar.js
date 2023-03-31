import CalendarCreationDOMInteractions from "../AbstractClasses/CalendarCreationDOMInteractions"

 /**
* crée un nouvel emploi du temps
*/
export function handleAddCalendar(e){
   let number = 1
   let content = document.querySelector('.content')
   let domInteractions = new CalendarCreationDOMInteractions()
   let form = domInteractions.createForm('POST', 'create-calendar')

   let formContent = `
       <table class="create_calendar_table">
           <thead>
               <tr>
                   <th>Matière</th>
                   <th>Chapitre à étudier</th>
                   <th>Date</th>
                   <th>Heure</th>
               </tr>
           </thead>
           <tbody class='calendar-creation-tbody'>
               <tr class='subject-line'>
                   <td><input type='text' name='subject-${number}' id='subject-input'></td>
                   <td><input type='text' name='chapter-${number}' id='chapter-input'></td>
                   <td><input type='date' name='date-${number}' id='date-input'></td>
                   <td><input type='time' name='hour-${number}' id='hour-input'></td>
                   <td class='row_action_button add_line_button'><i class='fas fa-plus add-line'></i></td>
                   <td class='row_action_button generate_calendar_button'><i class='fas fa-check generate-calendar'></i></td>
               </tr>
           </tbody>
       </table>
       <button type='submit' class='submitBtn modal-add' id='submit-calendar'>Créer l'amploi du temps</button>
   `
   
   content.querySelector('.calendar-creation-instructions').classList.add('slide-instructions-top')
   content.appendChild(form)
   form.innerHTML = formContent
   domInteractions.createModal('calendar_creation_modal', form, { defaultModalContent: true})
   domInteractions.handleModalResponsive() 
   domInteractions.handleActionsInModalContent()  
}