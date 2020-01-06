var Schemes=[];
var Requirements=[];
var Grants=[];
var Events=[];
var posts=[];
var posts=[];
var backup_list = [];
var sorted_posts=[];
var comments="";
var sorted_post_id=[];
var post_count_list=[];
var user_id_list=[];
var user_id;
//var user_type="Startup";
console.log("HI");
var sorted_post_id=[];

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user.uid);
    user_id=user.uid;
    get_name_from_id(user.uid);
    retrieve_posts();
  } else {
    // No user is signed in.
  }
});

function Signout(){
  console.log("here");
firebase.auth().signOut();

window.location.href="login_Startup.html";
}
function get_name_from_id(user_id){

  var root = new Firebase('https://endgame-ad6a9.firebaseio.com/');
  root=root.child("Users");
  root.once("value", function(snapshot) {
    console.log(snapshot.val());

    user_list=snapshot.val();
    username=user_list[user_id]["name"];
    //console.log(name);
  }, function (error) {

    alert("Kuch toh gadbad hai Daya");

   });
}

$(document).ready(function(){


    //load_sections('Events')*
});
function retrieve_posts(){
var root = new Firebase('https://endgame-ad6a9.firebaseio.com/');
root=root.child("Posts");


 root.once("value", function(snapshot) {

   console.log(snapshot.val());
   posts=snapshot.val();
   sort_posts();
   //categorize_posts();
 }, function (error) {

   alert("Kuch toh gadbad hai Daya");

  });


}

function sort_posts(){
console.log(posts);
// posts.shift();
for(post in posts){
  post_count_list.push(posts[post]["Count"]);
  user_id_list.push(post);
}
console.log(post_count_list);

backup_list = post_count_list.slice();
//console.log("timestamp = ",timestamp_list);
new_sorted_post_count_list = post_count_list.sort(function(a,b){return a-b});
console.log("backup_list = ",backup_list);
console.log(new_sorted_post_count_list);
for(var m=0;m<new_sorted_post_count_list.length;m++){

    for(var n=0;n<backup_list.length;n++){

        if(new_sorted_post_count_list[m]==backup_list[n]){
            console.log("Inside if");
            console.log(posts[0]);
            sorted_posts[new_sorted_post_count_list.length-m-1]=posts[user_id_list[n]];
            sorted_post_id[new_sorted_post_count_list.length-m-1]=user_id_list[n];
            console.log("CReating ID list",user_id_list[n]);
        }
    }
}
sorted_posts.shift();
sorted_post_id.shift();
console.log("After Shifting",sorted_posts);
categorize_posts();
}


function categorize_posts(){
// var post="";
console.log(sorted_posts);


for(post in sorted_posts){
  console.log(post);
  console.log(sorted_posts[post]["Type"]);
  if(sorted_posts[post]["Type"]=="Schemes"){
    Schemes.push(sorted_posts[post]);
    console.log(Schemes);
  }
  else if(sorted_posts[post]["Type"]=="Requirements"){
    Requirements.push(sorted_posts[post]);
    console.log("Yo");
    console.log(Requirements);
  }
  else if(sorted_posts[post]["Type"]=="Grants"){
    Grants.push(sorted_posts[post]);
    console.log(Grants);
  }
  else if(sorted_posts[post]["Type"]=="Events"){
    Events.push(sorted_posts[post]);
    console.log(Events);
  }
  //console.log(policies,requirements,grants,events);
  console.log(Schemes,Requirements,Grants,Events);
}
display_posts('Schemes');

display_posts('Grants');
display_posts('Events')
display_posts('Requirements');
}

function load_posts(sorted_posts,type_string){

  //sorted_posts=type;
  //console.log(Schemes);
  console.log(sorted_posts);
  for(post in sorted_posts){
    console.log(sorted_posts[post]);
    var div = document.createElement('div');
    div.className = 'tweet';
    name=sorted_posts[post]["Name"];
    date=sorted_posts[post]["Date"];
    time=sorted_posts[post]["Time"];
    text=sorted_posts[post]["Description"];
    title=sorted_posts[post]["Title"];
    upvote=sorted_posts[post]["Upvote"];
    tags=sorted_posts[post]["Tags"];

    comment_count=sorted_posts[post]["Comments"]["Comment_Count"];
    console.log("Comment_count",comment_count);
    console.log("here",sorted_post_id);
    post_id=sorted_post_id[post];
    console.log(sorted_posts[post]);

    console.log("------------------POST ID-----------------",post_id);
    string="comments_"+post_id;
    for(comment in sorted_posts[post]["Comments"]){
      console.log(sorted_posts[post]["Comments"][comment]);
      for(id in sorted_posts[post]["Comments"][comment]){

        console.log(id);
        comments+='<div class="tweet"><a class="avatar" href=""><img src="https://yt3.ggpht.com/-uJh4oSQAwak/AAAAAAAAAAI/AAAAAAAAAAA/AMGKfKvDP3w/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"/></a>\
        <div class="infoContainer">\
            <div class="nameContainer"><a href="#"><span class="name">'+name+'</span><span class="atMe">@BobRoss</span><span class="time">11m</span></a></div>\
            <div class="message">\
                <p>'+sorted_posts[post]["Comments"][comment][id]+'</p>\
            </div>\
        </div></div>';

      }
      console.log(comments);

    }
    upvote_id=upvote+"_"+post_id;
    comment_id=comment_count+"_"+post_id;
    upvote_value_id="number_upvote_"+post_id;
    comment_value_id="number_comment_"+post_id;
    s="Posted on "+ date + " " + time;
    if(name=="undefined"){
      name="Raj Kothari";
    }

    first='<div class="tweet" style="border:1px solid #D3D3D3;"><a class="avatar" href=""><img src="https://yt3.ggpht.com/-uJh4oSQAwak/AAAAAAAAAAI/AAAAAAAAAAA/AMGKfKvDP3w/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"/></a>\
    <div class="infoContainer">\
        <div class="nameContainer"><a href="#"><span class="name">'+name+'</span><br><span class="atMe">@RajKothari</span><span class="time">'+s+'</span></a></div>\
        <div class="message">\
            <b><b><u>'+title+'</u></b></b>\
            <p>'+text+'</p>\
        </div>\
        <div class="btns">\
        <button><i class="material-icons" id='+upvote_id+' onclick="upvote_fun(this);">thumb_up</i><span id='+upvote_value_id+' class="number">0</span></button>\
            <button><span class="fas fa-comment" id='+post_id+' onclick="commentsToPost(this)"></span><span class="number" id='+comment_value_id+'>'+comment_count+'</span></button>\
        </div>\
        <div id='+string+' class="comment-section-container" style="display:none">'
    comment_description="comment_description_"+post_id;
    row_id="row_"+post_id;
    second=              '<div class="row" id='+row_id+'>\
                              <div class="col-12">\
                                  \
                                      \
                                              <textarea id='+comment_description+' style="border-radius:5px;height: 100%; width: 100%; padding: 4px; margin: 5px;" rows="2" placeholder="Post a comment, share a link, or upload a photo..."></textarea>\
                                              <button id='+comment_id+' class="btn btn-success" onclick="postComment(this)">Post</button>\
                                    \
                                  </div>\
                              </div>\
                      </div>\
      </div>\
  </div>'
    div.innerHTML =first+comments+second;

    console.log(div);
    timeline_id="timeline_"+type_string;
    document.getElementsByName(timeline_id)[0].prepend(div);
    comments="";
  }
  apply_access_control();

}

function apply_access_control(){
  var url=new URL(window.location);
  user_type=url.searchParams.get("type");
  console.log("Applying access control");
  if(user_type=="startup"|| user_type=="mentor"){
    console.log("inside if")
    if(document.getElementById("section_Schemes")!=null){
        setTimeout(function(){
          document.getElementById("section_Schemes").style.display="none";
          document.getElementById("section_Grants").style.display="none";

        },100);

    }

    // console.log(document.getElementById("section_Grants"));
    //document.getElementById("section_Grants").style.display="none";
  }

}
function randomString(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
}

function upload_post(type,post_id){
  console.log("Uploading",type,post_id);

  var root = new Firebase('https://endgame-ad6a9.firebaseio.com/');
  post_count_ref=root.child("Posts").child("Post_Count");
  post_count_ref.once("value", function(snapshot) {


  post_count=snapshot.val();
  console.log(post_count);
    //categorize_posts();
  push_post(post_count,type,post_id);
  }, function (error) {

    alert("Kuch toh gadbad hai Daya");

   });

}



function name_from_id(user_id){

  var root = new Firebase('https://endgame-ad6a9.firebaseio.com/');
  root=root.child("Users");
  root.once("value", function(snapshot) {
    console.log(snapshot.val());

    user_list=snapshot.val();
    console.log(user_list[user_id]["name"]);
    return user_list[user_id]["name"];
    console.log(name);
  }, function (error) {

    alert("Kuch toh gadbad hai Daya");

   });
}

function push_post(post_count,type,post_id){
      console.log("pushing=",type);

      title_id="title_"+type;
      console.log(post_id);
      description_id="description_"+type;
      var title=document.getElementById(title_id).value;
      var d = document.getElementById(description_id).value;
      console.log(title,d);
      var current_date=new Date();
      var root = new Firebase('https://endgame-ad6a9.firebaseio.com/');
      if(username=="undefined"){
        username="Raj Kothari";
      }
      username="Raj Kothari";
      console.log(post_id,user_id,username,title,d,date,time,type,post_count);
      root.child("Posts").child(post_id).set({
          "UID":user_id,
          "Name":username,
          "Title":title,
          "Description":d,
          // "Type":document.getElementById("type").value,
          "Date":date,
          "Time":time,
          "Type":type,
          "Upvote":0,
          "Count":post_count+1,
          "Comments":{"Comment_Count":0}
      });
      var root = new Firebase('https://endgame-ad6a9.firebaseio.com/');
      root.child("Posts").child("Post_Count").set(post_count+1);

}

function upvote_fun(reference){


  var upvote_count=$(reference).attr("id").split("_")[0];
  var post_id=$(reference).attr("id").slice($(reference).attr("id").indexOf("_")+1,$(reference).attr("id").length);
  console.log(post_id);
  var root = new Firebase('https://endgame-ad6a9.firebaseio.com/');
  root=root.child("Posts").child(post_id).child("Upvote").set(parseInt(upvote_count)+1);
  console.log(upvote_count+"_"+post_id);
  console.log("number_upvote_"+post_id);
  console.log(document.getElementById("number_upvote_"+post_id));
  document.getElementById("number_upvote_"+post_id).innerHTML=parseInt(upvote_count)+1;
  updated_upvote=parseInt(upvote_count)+1;
  document.getElementById(upvote_count+"_"+post_id).id=updated_upvote+"_"+post_id;

}


function mainPost(type) {
    //var x = document.getElementById("post_ta").value;
//if(x!=""){
console.log(type);
var div = document.createElement('div');
div.className = 'tweet';
name=username;
var current_date=new Date();
date=current_date.getDate()+"/"+(current_date.getMonth()+1)+"/"+current_date.getFullYear();
time=current_date.getHours() + ":"+
      + current_date.getMinutes() + ":"
      + current_date.getSeconds();
title_id="title_"+type;


post_id=randomString(10,"Aa");
string="comments_"+post_id;
description_id="description_"+type;
upvote_id="0_"+post_id;
comment_count=0;
console.log(comment_count);
console.log("hello");
comment_id=comment_count+"_"+post_id;
upvote_value_id="number_upvote_"+post_id;
comment_value_id="number_comment_"+post_id;
title=document.getElementById(title_id).value;
s="Posted on "+ date + " " + time;
setTimeout(function(){
  text=document.getElementById(description_id).value;
  if(name=="undefined"){
    name="Raj Kothari";
  }
  first='<div class="tweet" style="border:1px solid #D3D3D3"><a class="avatar" href=""><img src="https://yt3.ggpht.com/-uJh4oSQAwak/AAAAAAAAAAI/AAAAAAAAAAA/AMGKfKvDP3w/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"/></a>\
  <div class="infoContainer">\
      <div class="nameContainer"><a href="#"><span class="name">'+name+'</span><br><span class="atMe">@RajKothari</span><span class="time">'+s+'</span></a></div>\
      <div class="message">\
          <b><b><u>'+title+'</u></b></b>\
          <p>'+text+'</p>\
      </div>\
      <div class="btns">\
      <button><i class="material-icons" id='+upvote_id+' onclick="upvote_fun(this);">thumb_up</i><span id='+upvote_value_id+' class="number">0</span></button>\
          <button><span class="fas fa-comment" id='+post_id+' onclick="commentsToPost(this)"></span><span class="number" id='+comment_value_id+'>'+comment_count+'</span></button>\
      </div>\
      <div id='+string+' class="comment-section-container" style="display:none">'
  comment_description="comment_description_"+post_id;
  row_id="row_"+post_id;
  second=              '<div class="row" id='+row_id+'>\
                            <div class="col-12">\
                                <div class="card">\
                                    <div class="card-block"></div>\
                                            <textarea id='+comment_description+' style="height: 100%; width: 100%; padding: 4px; margin: 5px;" rows="3" placeholder="Post a comment, share a link, or upload a photo..."></textarea>\
                                            <button id='+comment_id+' class="btn btn-success" onclick="postComment(this)">Post</button>\
                                   </div>\
                                </div>\
                            </div>\
                    </div>\
    </div>\
</div>\
</div>'
  div.innerHTML =first+second;

  console.log(div);
  timeline_id="timeline_"+type;
  console.log(timeline_id);
  document.getElementsByName(timeline_id)[0].prepend(div);
  upload_post(type,post_id);
},4000);
}




function load_events(){
  console.log("Hello");
}

function load_sections(section_type,section_type_string){
  console.log(section_type_string);
  section_id="section_"+section_type_string;
  timeline_id="timeline_"+section_type_string;
  title_id="title_"+section_type_string;
  description_id="description_"+section_type_string;
  var x=document.getElementById(section_type_string);
  // <input type="text" id=`+title_id+` placeholder="Enter Title"><br>
  x.innerHTML+=
  `<div class="addTweet" id=`+section_id+` style="margin-top:10px;height:300px;">

      <div class="avatar"><img src="https://pbs.twimg.com/profile_images/1044222938474397696/TtNO9cun_400x400.jpg"/></div>
      <!-- <div><input type="text" id="title" placeholder="Enter Title"><br></div> -->




          <div class=textarea>
          <label class="material-textfield" style='color:black;'>
            <input id=`+title_id+` style='margin-bottom:200px;color:black;' type="text" onchange="this.dataset.empty = !this.value;">
            <span data-label="Title" ></span>
          </label>

          <textarea style='height:100px' id=`+description_id+` placeholder="What's happening?"></textarea>

          <div class="btns">
              <div class="add"><a class="centre" href="#" data-balloon="Add Photos or Video" data-balloon-pos="up"><span class="far fa-image"></span></a><a class="centre" href="#" data-balloon="Add a GIF" data-balloon-pos="up"><span class="fas fa-film"></span></a><a class="centre" href="#" data-balloon="Add Poll" data-balloon-pos="up"><span class="far fa-chart-bar"></span></a></div>
              <div class="submit">

                  <button onclick="mainPost('`+section_type_string+`')"><span class="text">Post</span></button>
              </div>
          </div>
          </div>
      </div>
  </div>

  <div id="timeline_tweets" style="margin-left:40px;" name=`+timeline_id+` class="timeline">

      </div>
`;
console.log(section_type_string);
load_posts(section_type,section_type_string);
}


function display_posts(type){
  console.log("Display Posts=",type);
  if(type=="Schemes"){
    console.log(Schemes);
    load_sections(Schemes,"Schemes");
  }
  else if(type=="Requirements"){
    console.log(Requirements);
    load_sections(Requirements,"Requirements");
  }
  else if(type=="Grants"){
    console.log(Grants);
    load_sections(Grants,"Grants");
  }
  else if(type=="Events"){
    console.log(Events);
    load_sections(Events,"Events");
  }
  //load_sections('Schemes');
}

function postComment(reference) {
    var div = document.createElement('div');
    div.className = 'tweet';

    count=$(reference).attr("id").split("_")[0];
    id=$(reference).attr("id").slice($(reference).attr("id").indexOf("_")+1,$(reference).attr("id").length);

    new_id="comments_"+id;


    div.innerHTML =
    '<a class="avatar" href=""><img src="https://yt3.ggpht.com/-uJh4oSQAwak/AAAAAAAAAAI/AAAAAAAAAAA/AMGKfKvDP3w/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"/></a>\
    <div class="infoContainer">\
        <div class="nameContainer"><a href="#"><span class="name">'+username+'</span><span class="atMe">@RajKothari</span><span class="time">11m</span></a></div>\
        <div class="message">\
            <p>'+document.getElementById('comment_description_'+id).value+'</p>\
        </div>\
    </div>';
    //document.getElementById("ta_"+i).value="";
    //toggle_comment_box(id);

    row_id="row_"+post_id;
    node=document.getElementById(row_id);
    node.style.display="none";
    console.log(node);
    //node.style.display="none";
    console.log(node);
    //node.removeChild(node.lastChild);

    console.log(node);
    document.getElementById(new_id).appendChild(div);
    div_to_append='<div class="row" id='+row_id+'>\
                              <div class="col-12">\
                                  <div class="card">\
                                      <div class="card-block"></div>\
                                              <textarea id='+comment_description+' style="height: 100%; width: 100%; padding: 4px; margin: 5px;" rows="3" placeholder="Post a comment, share a link, or upload a photo..."></textarea>\
                                              <button id='+comment_id+' class="btn btn-success" onclick="postComment(this)">Post</button>\
                                     </div>\
                                  </div>\
                              </div>\
                      </div>';
    //document.getElementById(new_id).appendChild(div_to_append);
    console.log(id);
    comment_value_id="number_comment_"+id;
    document.getElementById(comment_value_id).innerHTML=parseInt(count)+1;

    add_comment(id,document.getElementById('comment_description_'+id).value);
}

var comment_count;
var comments=[];
function add_comment(post_id,post){
  var root = new Firebase('https://endgame-ad6a9.firebaseio.com/');
  root=root.child("Posts").child(post_id).child("Comments").child("Comment_Count");
  root.once("value", function(snapshot) {

    console.log(snapshot.val());
    comment_count=snapshot.val();
    upload_comment(post_id,post);
    //categorize_posts();
  }, function (error) {

    alert("Kuch toh gadbad hai Daya");

   });
}

function upload_comment(post_id,comment){
    //var comment=document.getElementById("comment").value;
    var root = new Firebase('https://endgame-ad6a9.firebaseio.com/');
    root.child("Posts").child(post_id).child("Comments").child(comment_count).child(user_id).set(comment);
    root.child("Posts").child(post_id).child("Comments").child("Comment_Count").set(comment_count+1);
}

function toggle_comment_box(post_id){
    string="comments_"+post_id;
    var x=document.getElementById(string);
    console.log("Came here");
    console.log(x);
    x.style.display="none";
    x.style.display="block";

}
