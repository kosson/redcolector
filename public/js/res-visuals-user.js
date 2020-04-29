// Resurse afișate tabelar
var TblTmpl = document.querySelector('#userResTbl'); // ref către template-ul resurselor în format tabelar
var cloneTbl = TblTmpl.content.cloneNode(true);      // clonarea template-ului pentru afișare tabelară

var uResTbl = cloneTbl.querySelector('#resurseTab');       // ref către div-ul gazdă al tabelului 
let divResurseTabelare = document.createElement('table');  // creează tabel
divResurseTabelare.classList.add('userResTbl');            // adaugă clasă la tabel
uResTbl.appendChild(divResurseTabelare);                   // append tabel la div-ul gazdă

var visuals = document.querySelector('#visuals');
var user_id = visuals.dataset.usrid;

pubComm.emit('usrRes', user_id); // emite cerere de date
pubComm.on('usrRes', (resurse) => {
    console.log(resurse);
    
    let newResultArr = []; // noul array al obiectelor resursă
    resurse.map(function clbkMapResult (obi) {
        obi.dataRo = moment(obi.date).locale('ro').format('LLL');
        newResultArr.push(obi);
    });
    // RANDEAZĂ TABELUL
    // https://datatables.net/manual/data/orthogonal-data
    $('.userResTbl').DataTable({
        responsive: true,
        data: newResultArr,
        ordering: true,
        info: true,
        columns: [
            {
                title: 'Data',
                data: {
                    _: 'dataRo',
                    sort: 'date'
                },
                render: function clbkTimeFormat (data, type, row) {
                    return `<p>${data}</p>`;
                }
            },
            {
                title: 'Accesează',
                data: '_id',
                render: function clbkId (data, type, row) {
                    return `<a href="${window.location.origin}/profile/${data}" class="btn btn-primary btn-sm active" role="button" aria-pressed="true">${data.slice(0,5)}...</a>`;
                }
            },
            {
                title: 'Validare',
                data: 'expertCheck',
                render: function clbkExpertChk (data, type, row) {
                    if (data) {
                        return `<p class="resvalid">validată</p>`;
                    } else {
                        return `<p class="resinvalid">nevalidată</p>`;
                    }
                }
            },
            { 
                title: 'Publică',
                data: 'generalPublic',
                render: function clbkGenPub (data, type, row) {
                    if (data) {
                        return `<p class="respublic">public</p>`;
                    } else {
                        return `<p class="resinvalid">internă</p>`;
                    }
                }
            },
            {
                title: 'Title',
                data: 'title'
            },
            {
                title: 'Autori',
                data: 'autori'
            },
            {
                title: 'Descriere',
                data: 'description'
            },
            {
                title: 'Licență',
                data: 'licenta'
            }
        ],
        language: {
            "sProcessing":   "Procesează...",
            "sLengthMenu":   "Afișează _MENU_ înregistrări pe pagină",
            "sZeroRecords":  "Nu am găsit nimic - ne pare rău",
            "sInfo":         "Afișate de la _START_ la _END_ din _TOTAL_ înregistrări",
            "sInfoEmpty":    "Afișate de la 0 la 0 din 0 înregistrări",
            "sInfoFiltered": "(filtrate dintr-un total de _MAX_ înregistrări)",
            "sInfoPostFix":  "",
            "sSearch":       "Caută:",
            "sUrl":          "",
            "oPaginate": {
                "sFirst":    "Prima",
                "sPrevious": "Precedenta",
                "sNext":     "Următoarea",
                "sLast":     "Ultima"
            }
        }
    });
});

var resVisuals = document.querySelector('#visuals');
resVisuals.appendChild(uResTbl); // injectează tabelul resurselor tabelare