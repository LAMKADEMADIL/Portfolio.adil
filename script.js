function toggleMenu(){
    let menu = document.getElementById("menu");

    if(menu.style.display === "block"){
        menu.style.display = "none";
    }else{
        menu.style.display = "block";
    }
}
function downloadCV(){
let confirmation = confirm("Voulez-vous télécharger le CV ?");

if(confirmation){
return true; // تحميل الملف
}else{
return false; // إلغاء التحميل
}
}   
function openlinkdin(){

let confirmation = confirm("Voulez-vous ouvrir mon profil LinkedIn ?");

if(confirmation){
return true; // تحميل الملف
}else{
return false; // إلغاء التحميل
}
}   
function opengithub(){
    let git = confirm('Voulez-vous ouvrir mon profil github ?');
    if(git){
        return true;
    }else{
        return false;
    }
}
function opengit(){
    let git = confirm('Voulez-vous ouvrir mon profil git ?');
    if(git){
        return true;
    }else{
        return false;
    }
}
function openfacebook(){
    let git = confirm('Voulez-vous ouvrir mon profil facebook ?');
    if(git){
        return true;
    }else{
        return false;
    }
}
function  openintagram(){
    let git = confirm('Voulez-vous ouvrir mon profil intagram ?');
    if(git){
        return true;
    }else{
        return false;
    }
}
function ovriresite(){
    let site = confirm('Voulez-vous ouvrir mon siteweb pepsi ?');
    if(site){
        return true;
    }else{
        return false;
    }
}

// تأكد من تحميل مكتبة EmailJS أولاً:
// <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>

// تهيئة EmailJS بمفتاحك العام
emailjs.init("SZSCM_-vAGeSv6BWn"); // استبدل YOUR_PUBLIC_KEY بمفتاحك

// الحصول على الفورم
const form = document.getElementById("contact-form");

form.addEventListener("submit", function(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    // إرسال البيانات عبر EmailJS
    emailjs.sendForm("service_pe5le1b", "template_lnkqs6p", this)
        .then(function(response) {
            console.log("SUCCESS!", response.status, response.text);
            alert(" le message a été envoyé succés . 👌");
        }, function(error) {
            console.error("FAILED...", error);
            alert(" Une erreur s'est produite . 🚨");
        });
});