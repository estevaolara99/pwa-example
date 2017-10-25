var notes = window.localStorage.getItem('notes') || '{"data":[]}';
   notes = JSON.parse(notes);


var updateList = function () {
    console.log('[Application] started watch');
    Array.observe(notes.data, function (changes) {
        var index = null;
        var value = '';
        var status = null;

        if(changes[0].type === 'splice'){
            index = changes[0].index;
            value = changes[0].object[index];
            status = (changes[0].addedCount > 0 ) ? 'created' : 'removed';

        }

        if(changes[0].type === 'update'){
            index = changes[0].name;
            value = changes[0].object[index];
            status = 'updated';
        }

        if(!value && status === 'created' && status === 'updated'){
            return;
        }

        var notesTag = document.getElementById('notas');

        if(status === 'updated'){
            console.log('Implementar');
        }

        if(status === 'removed'){
            var listOfNotes = document.querySelectorAll("#notas li");

            notesTag.removeChild(listOfNotes[index])
        }

        if(status === 'created'){

            var newLi = document.createElement('li');

            newLi.innerHTML = value;

            notesTag.appendChild(newLi);
        }

        window.localStorage.setItem('notes', JSON.stringify(notes));
    });
};

var createNote = function () {
    var input = document.querySelector('#form-add-note input[type="text"]');
    var value = input.value;

    notes.data.push(value);

    input.value = "";


};

updateList();

document.addEventListener('DOMContentLoaded', function (event) {

    var listOfNotes = document.getElementById('notas');
    var listHtml = '';

    for(var i = 0; i < notes.data.length; i++){
        listHtml += '<li>'+ notes.data[i] +'</li>';
    }

    listOfNotes.innerHTML = listHtml;

    var formAddNotes = document.getElementById('form-add-note');

    formAddNotes.addEventListener('submit', function (e) {
        e.preventDefault();

        createNote();
    });

});

document.addEventListener('click', function (e) {

   var notesTag = document.getElementById('notas');

   if(e.target.parentElement === notesTag){

        if(confirm('Remover esta nota?')){
            var listOfNotes = document.querySelectorAll('#notas li');
            listOfNotes.forEach( function (item, index ) {
                if(e.target === item ){
                    notes.data.splice(index, 1);
                }
            });
        }
   }

});

if('serviceWorker' in navigator){
    navigator.serviceWorker
        .register('./service-worker.js')
        .then(function (reg) {
           console.log('Service worker Registered');
        })
        .catch(function (err) {
            console.log('Erro', err);
        });
}