var startup_list=[];
var admins=[];
var startups=[];
var startup_mapping=[];
var admin_id=my_id;
var startup_ids=[];

var first_list=[];
var second_list=[];
load_admin_list();


function fetch_from_firebase(){

  var root = new Firebase('https://endgame-ad6a9.firebaseio.com/');
  for(id in startups){

    for(y in startups[id]){

      console.log(startups[id]);
      console.log(startups[id][y]);
      console.log(y);
      first_list.push(y);
      root.child("Users").child(y).once("value",function(snapshot){
          second_list.push(snapshot.val());



        //return second;

      }, function (error) {

        alert("Kuch toh gadbad hai Daya");

       });

       console.log(first_list,second_list);
    }


  }


}


function load_admin_list(){
  var root = new Firebase('https://endgame-ad6a9.firebaseio.com/');
  root=root.child("Admin_mentor_structure").child(admin_id).child("startup_requests");
  root.once("value", function(snapshot) {
    console.log(snapshot.val());
    startup_list=snapshot.val();
    //console.log(admin_list);
    console.log(startup_list);
    for(startup in startup_list){
      startups.push(startup_list[startup]);
    }
    console.log(startups);
    fetch_from_firebase();
    build_rows();

  }, function (error) {

    alert("Kuch toh gadbad hai Daya");

   });

}

function build_rows(){



  var ref_to_startup_section = document.getElementById("startup_section");

  for(mentor_id in startup_list){


    name_of_mentor=name_from_id(mentor_id,"mentor");
    console.log("mentor id for",mentor_id,name_of_mentor);
    setTimeout(function(){
      row_id="row_"+mentor_id;
      details_id="details_"+mentor_id;
      console.log(mentor_names);
      name_of_mentor=mentor_names[0];

      console.log("Setting mentor id----------------",mentor_id);
      console.log("Setting row id---------------",row_id);
      ref_to_startup_section.innerHTML+=`

                 <tr>
                    <td> <br><br><div class="tree">
                      <ul>

                          <li id=`+row_id+`>
                              <a href="#" onclick="getmentors(this)" id="c5" name=`+mentor_id+`><img src="http://lorempixel.com/100/100/people/9" alt="" /></a>



                          </li>

                      </ul></div></td>
                      <td><br><br>
                      <div id=`+details_id+` style="border-radius: 10px;box-shadow: 0px 4px 6px 2px rgba(0, 0, 0, 0.05);background-color: #ffffff;height:100%">`+name_of_mentor+`<br><br></div>
                  </td>

                 </tr>


          `;

    },2000);




  }

}
var startup_names=[];
var mentor_names=[];
var name_of_startup;
function name_from_id(user_id,type){
  console.log("user_id",user_id);
  var root = new Firebase('https://endgame-ad6a9.firebaseio.com/');
  root=root.child("Users");
  root.once("value", function(snapshot) {
    console.log(snapshot.val());

    user_list=snapshot.val();

    if(type=="startup"){
      console.log("Appending",user_list[user_id]["name"]);
      startup_ids.push(user_id);
      startup_names.push(user_list[user_id]["name"]);
    }
    else if(type=="mentor"){
      mentor_names.push(user_list[user_id]["name"]);
    }
    return user_list[user_id]["name"];
    console.log(name);
  }, function (error) {

    alert("Kuch toh gadbad hai Daya");

    });
}

function getmentors(reference){

    var startup_id=$(reference).attr("name");



    for(s in startup_list[startup_id]){

      name_of_startup=name_from_id(s,"startup");

    }
    setTimeout(function(){

      console.log(startup_names);
      create_tree(startup_id);
    },3000);


    // console.log(row_id);
    // document.getElementById(row_id).innerHTML+=final;
    //
    // final="";

    //console.log(startup_list[startup_id]);
}

function create_tree(mentor_id){
  if(mentor_names.length>1){
  
  mentor_names.shift();
  }

  console.log("setting name of mentor_id",mentor_id);
  for(startup_name in startup_names){

      second+=`<li><a href="#" name=`+mentor_id+` id="`+startup_ids[startup_name]+`" onclick="get_details_of_mentor(this)">`+startup_names[startup_name]+`</a></li>`;

  }
  console.log(mentor_names);
  console.log(mentor_id);
  row_id="row_"+mentor_id;
  console.log("Setting-----------",row_id);
  final+=`<ul id="c6">`+second+`</ul>`;
  console.log(final);
  document.getElementById(row_id).innerHTML+=final;


  //$(document.getElementById(name)).data("Object",json_obj);
  final="";
}

function get_details_of_mentor(ref){
  var nam=$(ref).attr("id");
  console.log("details are---------",nam);
  console.log("index of first list",first_list.indexOf(nam));
  console.log("index of second list",second_list[first_list.indexOf(nam)]);
  var m=$(ref).attr("name");
  details_id="details_"+mentor_id;
  document.getElementById(details_id).innerHTML=second_list[first_list.indexOf(nam)]["Location"]+"<br><br>";
  // details_id="details_"+mentor_id;
}
