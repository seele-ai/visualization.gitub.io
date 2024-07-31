var mainuni = {
    Physics : [
        {uni: "University of Helsinki" , city: "Helsinki"},
        {uni: "Aalto University" , city: "Helsinki"},
        {uni: "University of Jyvaskyla" , city: "Jyväskylä"},
        {uni: "Lappeenranta University of Technology" , city: "Lappeenranta"},
        {uni: "University of Turku" , city: "Turku"}
    ],
    Astronomy_Astrophysics : [
        {uni: "University of Helsinki" , city: "Helsinki"},
        {uni: "University of Turku" , city: "Turku"},
        {uni: "Aalto University" , city: "Helsinki"},
        {uni: "University of Jyvaskyla" , city: "Jyväskylä"},
        {uni: "University of Oulu" , city: "Oulu"}
    ],
    Instruments_Instrumentation : [
        {uni: "Aalto University" , city: "Helsinki"},
        {uni: "University of Helsinki" , city: "Helsinki"},
        {uni: "University of Tampere" , city: "Tampere"},
        {uni: "University of Oulu" , city: "Oulu"},
        {uni: "Lappeenranta University of Technology" , city: "Lappeenranta"}
    ],
    Genetics_Heredity : [
        {uni: "University of Helsinki" , city: "Helsinki"},
        {uni: "University of Tampere" , city: "Tampere"},
        {uni: "University of Turku" , city: "Turku"},
        {uni: "University of Eastern Finland" , city: "Joensuu/Kuopio"},
        {uni: "University of Oulu" , city: "Oulu"}
    ],
    Biochemistry_MolecularBiology : [
        {uni: "University of Helsinki" , city: "Helsinki"},
        {uni: "University of Turku" , city: "Turku"},
        {uni: "University of Eastern Finland" , city: "Joensuu/Kuopio"},
        {uni: "Aalto University" , city: "Helsinki"},
        {uni: "University of Tampere" , city: "Tampere"}
    ],
    Oncology : [
        {uni: "University of Helsinki" , city: "Helsinki"},
        {uni: "University of Tampere" , city: "Tampere"},
        {uni: "University of Turku" , city: "Turku"},
        {uni: "University of Eastern Finland" , city: "Joensuu/Kuopio"},
        {uni: "University of Oulu" , city: "Oulu"}
    ],
}

function drawtable(){
    //获取学科选择器的值
    var subjects = document.getElementById('choose-subject')
    var selected_subject = subjects.options[subjects.selectedIndex].value;

    console.log(selected_subject)

    var universities = mainuni[selected_subject];

    d3.select('tbody').html('');

    //更新列表
    universities.forEach(function(entry) {
        var row = d3.select('tbody').append('tr');
        row.append('td').text(entry.uni);
        row.append('td').text(entry.city);
    });
}