const firebaseConfig = {
	apiKey: "xxx",
	authDomain: "xxx",
	databaseURL: "xxx",
	projectId: "leading-japanese",
	storageBucket: "xxxx",
	messagingSenderId: "xxx",
	appId: "xxx",
	measurementId: "xxx"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const  app = firebase.app();
const defaultAuth = firebase.auth();
const database = firebase.database();
// const perf = firebase.performance();
// // ========== Register SC ==========


function toggleSignIn() {
	if (defaultAuth.currentUser) {
		defaultAuth.signOut();
	} else {
		const email = $('#current-email').val();
		const password = $('#current-password').val();
		let isValidEmail = true;
		let isValidPassword = true;
		if(email.length === 0){
			isValidEmail = false;
			alert('Please enter an email address.');
		}else {
			isValidEmail = true;
		}
		if(password.length === 0){
			isValidPassword = false;
			alert('Please enter a password.');
		}else {
			isValidPassword = true;
		}

		if(isValidEmail && isValidPassword) {
			defaultAuth.signInWithEmailAndPassword(email, password).catch(function (error) {
				const errorCode = error.code;
				const errorMessage = error.message;
				// [START_EXCLUDE]
				if (errorCode === 'auth/wrong-password') {
					alert('Wrong password.');
				} else {
					alert(errorMessage);
				}
			});
		}
		defaultAuth.onAuthStateChanged(function(user)
		{
			if(user) {
				window.location.assign("./index.html");
			}
		});
	}
}
function handleSignUp() {
	const email = document.getElementById('email-registration').value;
	const password = document.getElementById('password-registration').value;
	if (email.length < 4) {
		alert('Please enter an email address.');
		return;
	}
	if (password.length < 4) {
		alert('Please enter a password.');
		return;
	}
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		// Handle Errors here.
		const errorCode = error.code;
		const errorMessage = error.message;
		if (errorCode === 'auth/weak-password') {
			alert('The password is too weak.');
		} else {
			alert(errorMessage);
		}
		console.log(error);
	});

}
// function sendEmailVerification() {
// 	firebase.auth().currentUser.sendEmailVerification().then(function() {
// 		alert('Email Verification Sent!');
//
// 	});
// }
function sendPasswordReset() {
	const email = document.getElementById('email').value;
	firebase.auth().sendPasswordResetEmail(email).then(function() {

		alert('Password Reset Email Sent!');

	}).catch(function(error) {
		const errorCode = error.code;
		const errorMessage = error.message;
		// [START_EXCLUDE]
		if (errorCode === 'auth/invalid-email') {
			alert(errorMessage);
		} else if (errorCode === 'auth/user-not-found') {
			alert(errorMessage);
		}
		console.log(error);
		// [END_EXCLUDE]
	});
}
function logoutUser() {
	defaultAuth.signOut().then(function() {
		window.location.assign("./index.html");
	}).catch(function(error) {
		// An error happened.
	});
}
// Profile

function Profile() {
	const user = defaultAuth.currentUser;
	let name, email, photoUrl, userId, emailVerified, credential;
	if (user != null) {
		name = user.displayName;
		email = user.email;
		photoUrl = user.photoURL;
		emailVerified = user.emailVerified;
		userId = user.uid;
		const username = email.slice(0, 9);
		viewProfile(userId);
		Disconnect(userId);
		const c = document.getElementById("imgses_Canvar");
		const ctx = c.getContext("2d");
		ctx.font = "30px Arial";
		ctx.fillText(username, 80, 80);
		const img = ctx.canvas.toDataURL();
		// c.toBlob(function(blob) {
		//
		// 	const url = URL.createObjectURL(blob);
		// 	console.log(URL.createObjectURL(blob));
		//
		// 	// delete the internal blob reference, to let the browser clear memory from it
		// 	URL.revokeObjectURL(url);
		// 	console.log(URL.revokeObjectURL(url))
		// 	// get arrayBuffer from blob
		// 	let fileReader = new FileReader();
		//
		// 	fileReader.readAsArrayBuffer(blob);
		//
		// 	fileReader.onload = function(event) {
		// 		let arrayBuffer = fileReader.result;
		// 		console.log(arrayBuffer)
		// 	};
		// }, 'image/png');
		writeUserData(userId,email,username, img);
	}
}

function viewProfile(userId) {
	firebase.database().ref('users/' + userId).once('value').then(function (user) {
		const username = user.val().username;
		const email = user.val().email;
		const profile_picture = user.val().profile_picture;
		$('#form-profile').html('<div class="edit-profile"><a href="#editprofiel" class="btn btn-primary full-rounded btn nextBtn  mt-2 animated text-white d-none" id="editprofiel" data-toggle="modal"  onclick="UpdateUser(\''+userId+'\')"><span><i class="fas fa-edit"></i>Edit</span></a></div>' +
			'<div class="card"><img src="'+profile_picture+'" alt="avatar" class="img-avatar img-fluid"><div class="card-body"><div class=""><h5>Email</h5><p class="cavar-imgaes">'+username+'</p></div><div class=""><h5>名前と苗字</h5><p class="email-user">'+email+'</p></div> </div> </div>');
		$('#no-api-internet').hide();
		$('.img-avatar').attr('src', user.val().profile_picture);
		messagesRoom(userId,email,profile_picture);
	});
}
function writeUserData(userId, username, email, img) {
	database.ref('users/' + userId).set({
		username: username,
		email: email,
		profile_picture : img
	});
}

function UpdateUser(userId) {
	$('#ModalUser').modal('toggle');
	$('#update-profile').on('click',function (e) {
		const name = $('#fullName').val();
		const emaik = $('.email-user').text();
		database.ref('users/' + userId).update({
			username: name,
			email: emaik,
			profile_picture : avatar
		}, function(error) {
			if (error) {
			} else {
				// Data saved successfully!
			}
		});
		e.preventDefault();
	});
	const avatar = [];
	$('#avatar').on('change',function (evt) {
		const file = evt.target.files[0];
		const metadata = {
			'contentType': file.type
		};
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function(e){

		};
		// Push to child path.
		const Storage = firebase.storage();
		const allImagesRef = Storage.ref();
		allImagesRef.child('user/' + file.name).put(file, metadata).then(function (snapshot) {
			snapshot.ref.getDownloadURL().then(function (url) {
				// sessionStorage.setItem('avatar', url);
				avatar.push(url);
				$('#avatar-img').html('<img src="'+url+'" class="img-fluid " alt="img"/>');
			});
		}).catch(function (error) {
			console.error('Upload failed:', error);
		});
	});
}
function ClickAc(userID) {
	$('#add-news').on('click',function (e) {
		return addNews(userID,newsImages);
		e.preventDefault();
		$('.modal-body').find('input, textarea').val('');
	});
	$('#add-Lettering').on('click',function (e) {
		return addLettering(userID);
		e.preventDefault();
		$('.modal-body').find('input, textarea').val('');
	});
	let newsImages = [];
	$('#newsImages').on('change',function(e){
		const files = e.target.files;
		$.each(files, function(i, file){
			const reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = function(e){
				newsImages.push(e.target.result);
				const image = '<li class="nav-item">\n' +
					'<a class="nav-link">' +
					'                                <img  src="' + e.target.result + '" class="img-thumbnail" alt="">\n' +
					'                                <span class="btn remove"><i style="color: #fff" class="fa fa-close"></i></span>\n' +
					'</a>' +
					'                            </li>';
				$('.img-scr-view').append(image);
			};
		});
		$('body').on('click','.remove',function () {
			const val = $(this).closest('.nav-item').find('.nav-link');
			const index = newsImages.findIndex(function(item)
			{
				val.remove();
				return item.src === val;
			});
			newsImages.splice(index, 1);
		});
	});
}
// Add

function addLettering(userID) {
	const ja  = $('#jaListening').val();
	const audio  = $('#audioListening').val();
	const category = $('#categoryLettering option:selected').val();
	const postData = {
		uid: userID,
		ja: ja,
		starCount: 0,
		url_audio: audio,
		data_time: new Date()
	};
	const newPostKey = firebase.database().ref().child('posts/').push().key;
	const updates = {};
	updates['/posts/' + 'lettering/'+ category +'/' + newPostKey] = postData;
	updates['/user-posts/' + userID + '/lettering/' + category +'/' + newPostKey] = postData;
	return firebase.database().ref().update(updates);
}
function addPhotoGirl(userID) {

}
function addNews(userID,imagesNews) {
	const title  = $('#titleNews').val();
	const tag = $('#linkNews').val();
	const text = $('#textareaNews').val();
	const category = $('#categoryNews option:selected').val();
	const star = $('#starNews option:selected').val();
	const date = new Date();
	const postData = {
		title: title,
		tag: tag,
		uid: userID,
		category: category,
		text: text,
		star: star,
		images: imagesNews,
		starCount: 0,
		createUp: date
	};
	// Get a key for a new Post.
	const newPostKey = firebase.database().ref().child('posts/').push().key;
	const updates = {};
	updates['/posts/' + 'news/'+ category +'/' + newPostKey] = postData;
	updates['/user-posts/' + userID + '/news/' + category +'/' + newPostKey] = postData;

	return firebase.database().ref().update(updates);
	sessionStorage.clear();
}
// View
function GameView(usersID) {

}
function  LetteringView() {
	$('.lettering-footer .btn-group button').on('click',function (e) {
		$(this).addClass('active').siblings().removeClass('active');
		const  click = $(this).attr('data-page');
		if(click){
			$('#lettering div[id = '+click+']').addClass('active').siblings().removeClass('active');
			console.log(click);

		}
	})
	const re1 = firebase.database().ref("posts/lettering/hiragana").limitToLast(46);
	re1.orderByKey().on("value", function(snapshot) {
		let items ='', katagana = '';
		let hira = $('.hiragnana');
		snapshot.forEach(function(childSnapshot) {
			const childData = childSnapshot.val();
			items +=		'<li>\n' +
				'                                    <a href="javascript:void(0);"  data-name="'+childData.url_audio+'"><img data-play="'+childData.url_audio+'"  src="https://www.nhk.or.jp/lesson/assets/images/letters/hira/'+childData.ja+'.png" alt=""></a>\n' +
				'                                    <div class="audio">\n' +
				'                                        <audio  controls data-audio="'+childData.url_audio+'" class="audio-play-auto">\n' +
				'                                            <source src="https://www.nhk.or.jp/lesson/mp3/syllabary/'+childData.url_audio+'.mp3" >\n' +
				'                                        </audio>\n' +
				'                                    </div>\n' +
				'                                </li>';
			katagana +='<li>\n' +
				'                                    <a href="javascript:void(0);"  data-name="'+childData.url_audio+'"><img data-play="'+childData.url_audio+'"  src="https://www.nhk.or.jp/lesson/assets/images/letters/kana/'+childData.ja+'.png" alt=""></a>\n' +
				'                                    <div class="audio">\n' +
				// '                                        <audio  controls data-audio="'+childData.url_audio+'" class="audio-play-auto">\n' +
				// '                                            <source src="https://www.nhk.or.jp/lesson/mp3/syllabary/'+childData.url_audio+'.mp3" >\n' +
				// '                                        </audio>\n' +
				'                                    </div>\n' +
				'                                </li>';
		});
		hira.html(items);
		$('.kana').html(katagana);

		hira.on('click',function () {
			$(this).attr('data-name').addClass('show-model').siblings().removeClass("show-model");
			$('.show-model').html()
		})
	});
	const re = firebase.database().ref("posts/lettering/kanji").limitToLast(46);
	re.orderByKey().on("value", function(snapshot2) {
		let items =''
		snapshot2.forEach(function(childSnapshot) {
			const childData = childSnapshot.val();
			items +=		'<li>\n' +
				'                                    <a href="javascript:void(0);"><img data-play="'+childData.url_audio+'"  src="https://www.nhk.or.jp/lesson/assets/images/letters/kanji/'+childData.ja+'.png" alt=""></a>\n' +
				'                                </li>';
		});
		$('.kanji').html(items);
	});
}
function viewNews() {

	let userPostsRef = firebase.database().ref('posts/news/ニュース').limitToLast(6);
	userPostsRef.orderByKey().on("value", function(snapshot1) {
		let items = '';
		snapshot1.forEach(function(childSnapshot1) {
			const id = childSnapshot1.key;
			const childData = childSnapshot1.val();
			items +='<div class="col-6 col-md-6 col-lg-3 col-xl-3 h-25">\n' +
				'                        <div class="card-d">\n' +
				'                            <img src="'+childData.images[0]+'" class="card-img-top" alt="'+childData.title+'">\n' +
				'                            <div class="card-body-d">\n' +
				'                               <a href="javascript:void(0);" onclick="viewNewsModel(\'' + id + '\')"><h5 class="card-title">'+childData.title+'</h5></a>\n' +
				'                               <p class="card-text cut-hide-text">'+childData.text+'</p>\n' +
				'                           </div>\n' +
				'                        </div>\n' +
				'                    </div>';
		});
		$('#card-news').html(items);
	});

	let ショ = firebase.database().ref('posts/news/ショートストーリー').limitToLast(6);
	ショ.orderByKey().on("value", function(snapshot) {
		let slider = '';
		snapshot.forEach(function(childSnapshot1) {
			const id = childSnapshot1.key;
			const childData = childSnapshot1.val();
			slider +='<div class="swiper-slide shadow-sm position-relative overflow-hidden" onclick="iframeViewPage(\'' + id + '\')">\n' +
				'                            <img src="'+childData.images[0]+'" alt="" class="img-fluid">\n' +
				'                            <div class="swiper-slide-body">\n' +
				'                                <h4>'+childData.title+'</h4>\n' +
				'                            </div>\n' +
				'                        </div>';
		});
		$('.swiper-wrapper').html(slider);
	});
}
// Model

function viewNewsModel(id) {
	$('#ModalView').modal('toggle');
	let PostsRef = firebase.database().ref('posts/news/ニュース/'+ id);
	let ms = '';
	let item = '';
	PostsRef.orderByKey().on("value", function(snapshot) {
		const sd = snapshot.val();
		let uid = sd.uid;
		// sessionStorage.setItem('id-s', ui);
		let images = sd.images;
		for(let k = 0; k < images.length; k++){
			item += '<div class="news-modal-slider-item"><img src="'+images[k]+'" class="w-100" alt="a"></div>';
		}
		ms +=`<button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>`;
		ms +='<div class="news-modal">\n' +
			'<div class="news-modal-slider"></div>\n' +
			'<div class="news-modal-content">\n' +
			'<div class="time-content">\n' +
			'\t\t\t\t\t\t\t<span class="mb-0 text-muted"><i class="fas fa-clock"></i>'+sd.createUp+'</span>\n' +
			'\t\t\t\t\t\t</div>\n' +
			'  \t\t\t\t\t\t<div class="text-content font-size-lg text-gray-500">\n' +
			'  \t\t\t\t\t\t\t<h4 class="mt-2">'+sd.title+'</h4>\n' +
			'\t\t\t\t  \t\t\t<p >'+sd.text+'</p>\n' +
			'\t\t\t\t\t\t</div>\n' +
			'\t\t\t\t\t\t<div class="messages-content">\n' +
			'<h4>コメント</h4>'+
			'\t\t\t\t\t\t\t<form>\n' +
			'\t\t\t\t\t\t\t\t<div class="input-group input-group-sm">\n' +
			'  \t\t\t\t\t\t\t\t\t<textarea class="form-control form-control-sm" id="text-Content" aria-label="With textarea" ></textarea>\n' +
			'  \t\t\t\t\t\t\t\t\t<div class="input-group-prepend">\n' +
			'    \t\t\t\t\t\t\t\t\t<a href="#" type="submit" onclick="ContentModel(\''+id+'\')" class="input-group-text">送る</a>\n' +
			'  \t\t\t\t\t\t\t\t\t</div>\n' +
			'\t\t\t\t\t\t\t\t</div>\n' +
			'</form>\n' +
			'<ul id="'+id+'" class="commuter list-unstyled mt-3">\n' +
			'</ul>\n' +
			'</div>\n' +
			'</div>\n' +
			'</div>';
	});
	$('.model-view-body').html(ms);
	$('.model-view-body .news-modal-slider').html(item);
	Slider();
	ViewContent(id);
}
function iframeViewPage(id) {
	$('#ModalView').modal('toggle');
	let PostsRef = firebase.database().ref('posts/news/ショートストーリー/'+ id);
	let items = '';
	let item = '';
	PostsRef.orderByKey().on("value", function(snapshot) {
		const sd = snapshot.val();
		let images = sd.images;
		for(let k = 0; k < images.length; k++){
			item += '<div class="news-modal-slider-item"><img src="'+images[k]+'" class="w-100" alt="a"></div>';
		}
		items +=`<button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>`;
		items +=`<div class="news-modal">
							<div class="news-modal-slider"></div>
							<div class="time-content">
								<span class="mb-0 text-muted"><i class="fas fa-clock"></i>${sd.createUp}</span>
							</div>
  					<div class="news-modal-content font-size-lg text-gray-500">
  						<h5>${sd.title}</h5>
  						<p>${sd.text}</p>
					</div>
				</div>`;
	});
	$('.model-view-body').html(items);
	$('.model-view-body .news-modal-slider').html(item);
	Slider();
}
function Slider() {
	let slideIndex = 0;
	showSlides();
	function showSlides() {
		let i;
		const  slides = $('body').find('#ModalView').find('.model-view-body .news-modal .news-modal-slider .news-modal-slider-item').find('img');
		for (i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
		}
		slideIndex++;
		if (slideIndex > slides.length) {slideIndex = 1}
		slides[slideIndex-1].style.display = "block";
		setTimeout(showSlides, 3000);
	}
}
function ContentModel(id) {
	const  text = $('#text-Content').val();
	const  name = $('.viewsa').text();
	const username = name.slice(0, 9);
	const data = {
		username : username,
		text : text,
		date : new Date(),
		uid : id
	}
	const updates = {};
	const newPostKey = firebase.database().ref().child('post-comments/').push().key;
	updates['/post-comments/' + id +'/'+ newPostKey] = data;
	return firebase.database().ref().update(updates);
	$(this).val('');
}
function ViewContent(id) {
	let PostsRef = firebase.database().ref('post-comments/' + id);
	PostsRef.orderByKey().on("value", function(snapshot) {
		let html = '';
		snapshot.forEach(function(childSnapshot) {
			const childData = childSnapshot.val();
			$('body').find('#ModalView').find('.model-view-body .news-modal .news-modal-content .messages-content .commuter').each(function () {
				const i = $(this).attr('id');
				if(i === id){
					html += '<li class="media">\n' +
						'    <div class="media-body">\n' +
						'      <h5 class="mt-0 mb-1">'+childData.username+'</h5>\n' +
						'<p>'+childData.text+'</p>'+
						'    </div>\n' +
						'  </li>';
				}
			});
		});
		$('.commuter').html(html);
	});

}
// Messages

function messagesRoom(userID,email,profile_picture) {
	// chat message
	$("#messageInput").keypress(function (e){
		if(e.keyCode === 13){ //Enter
			const  messageVal = $("#messageInput");
			const text = messageVal.val();
			let isValidtext = true;
			if(text.length === 0){
				isValidtext = false;
				messageVal.css("border",'1px solid #fe244b');
			}else{
				const userm = {
					avatar: profile_picture,
					uid: userID,
					name: email,
					image: imgChat,
					text: text,
					status: 0
				};
				userPostsRef.push(userm);
			}
			messageVal.val(function (evt) {
				return evt;
			});
		}
	});
	$('.sent-message-btn').on('click',function (e) {
		$("#messageInput").keypress();
		e.preventDefault();
	});

	//  array icon click
	const  show = $('.show-icon');
	show.hide();
	$('#icon-show-chat').click(function () {
		show.toggle();
	});
	const emojis = ["😀", "😁", "😂", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘", "😗", "😙", "😚", "☺️", "🙂", "🤗", "😇", "🤓", "🤔", "😐", "😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯", "😪", "😫", "😴", "😌", "😛", "😜", "😝", "😒", "😓", "😔", "😕", "🙃", "🤑", "😲", "😷", "🤒", "🤕", "☹️", "🙁", "😖", "😞", "😟", "😤", "😢", "😭", "😦", "😧", "😨", "😩", "😬", "😰", "😱", "😳", "😵", "😡", "😠", "😈", "👿", "👹", "👺", "💀", "☠️", "👻", "👽", "👾", "🤖", "💩", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🙈", "🙉", "🙊", "👦"];
	let html = '';
	for(let k = 0; k < emojis.length; k++){
		html+="<span class='click' data-icon='"+emojis[k]+"'>"+emojis[k]+"</span>";
		show.html(html);
		$('.click').on('click', function (e) {
			const x = $(this).data('icon');
			$('#messageInput').val(function () {
				return this.value +  x;
			});
			e.preventDefault();
		});
	}

	const imgChat = [];
	setTimeout(function () {
		return imgChat[0];
	},1500);

	$('#file-img').on('change',function (evt) {
		const file = evt.target.files[0];
		const metadata = {
			'contentType': file.type
		};
		// Push to child path.
		const Storage = firebase.storage();
		const allImagesRef = Storage.ref();
		allImagesRef.child('chat/' + file.name).put(file, metadata).then(function (snapshot) {
			snapshot.ref.getDownloadURL().then(function (url) {
				imgChat.push(url);
				let imglist = '';
				imglist +='<img src=" '+url +' " class="img-fluid" alt=""><span class="close-all"></span>';
				$('.show-images').html(imglist);
			});
		}).catch(function (error) {
			console.error('Upload failed:', error);
		});
	});

	// remover img file
	$('body').on('click','.close-all',function () {
		const control = $("#file-img");
		const  showImages = $('.show-images');
		control.replaceWith( control.val('').clone( true ) );
		showImages.find('img').remove();
		showImages.find('.close-all').remove();
	});


	$('#school-groups .list-group .list-group-item').on('click',function () {
		const  category = $(this).attr('data-chat');
	});

	let userPostsRef = firebase.database().ref('posts/chat_room/');


	userPostsRef.on('child_added', function (snapshot, prevChildKey){
		const message = snapshot.val();
		const id = snapshot.key;
		viewchat(message.name, message.text, message.image, message.time, id, message.avatar);
	});

	function viewchat(name, text,image,time,id, avatar) {
		let items = '';
		const chatconten = $('div');

		$('body').find('#school-groups').find('.chat-content div .media .media-body .img-chat-da').each(function(i){
			const img = $(this).attr('src');
			if(img === 'undefined' && img !== 'null'){
				$(this).addClass('d-none');
			}
		});

		items +='<div class="media mb-3" data-key="'+id+'">' +
			'<img src="'+avatar+'" class="align-self-start mr-3 shadow-sm" alt="avatar">' +
			'<div class="media-body">' +
			'<h5 class="mt-0">'+name+'</h5>' +
			'<p>'+text+'</p><img src="'+image+'" alt="img"  class="img-chat-da"></div><a data-key="'+id+'" href="#" class="card-footer-item btnRemove d-none">Remove</a></div>';
		$('<div/>').prepend(items).appendTo($(".chat-content"));
		chatconten[0].scrollTop = chatconten[0].scrollHeight;
	}
	$(document).on("click",".btnRemove",function(event){
		event.preventDefault();
		const key = $(this).attr("data-key");
		const ref = database.ref('posts/chat_room/' + key +'/' + userID);
		ref.remove().then(function() {$('div[data-key = '+key+']').hide();}).catch(function(error) {});
	})

}
function checkIp(userID) {
	const ip = firebase.database().ref("checkip/" + userID);
	const  user = navigator.userAgent;
	$.get("https://api.ipdata.co?api-key=test", function (response) {
			const json = {
				"ip": response.ip,
				"is_eu": false,
				"city": response.city,
				"region": response.region,
				"region_code": response.region_code,
				"country_name": response.country_name,
				"country_code": response.country_code,
				"continent_name": response.continent_name,
				"continent_code": response.continent_code,
				"latitude": response.latitude,
				"longitude": response.longitude,
				"agent_header": user,
			};
			ip.set(json);
	}, "jsonp");
}
function Disconnect(userId) {
	const ref = firebase.database().ref("users/" + userId);
	ref.update({
		onlineState: true,
		status: "I'm online."
	});
	ref.onDisconnect().update({
		onlineState: false,
		status: "I'm offline."
	});
	const myConnectionsRef = firebase.database().ref('users/'+ userId +'/connections');

	const lastOnlineRef = firebase.database().ref('users/'+userId+'/lastOnline');

	const connectedRef = firebase.database().ref('.info/connected');
	connectedRef.on('value', function(snap) {
		if (snap.val() === true) {
			const con = myConnectionsRef.push();
			con.onDisconnect().remove();
			con.set(true);
			lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
		}
	});
}
function initApp() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			const displayName = user.displayName;
			const email = user.email;
			const emailVerified = user.emailVerified;
			const photoURL = user.photoURL;
			const isAnonymous = user.isAnonymous;
			const userID = user.uid;
			const providerData = user.providerData;

			LetteringView();
			GameView(userID);
			Profile();
			ClickAc(userID);
			viewNews();
			checkIp(userID);
			$('.app,#editprofiel,#header .setting-mobiles-nav,#header .banner-text').show();
			$('#home,footer,#dowload-app,.banner,.setting-desktop-nav').hide();
			$('#account-details').html(email);

			// console.log(JSON.stringify(user, null, '  '))
		} else {

		}
	});
	$('#btn-singin').on('click',function (e) {
		toggleSignIn();
		e.preventDefault();
	});
	$('#btn-singup').on('click', function (e) {
		handleSignUp();
		e.preventDefault();
		$('.loginbtn').on('click',function (e) {
			$('#show-login,.bg-right').show(1000);
			$('.login-hideer,.bg-left').hide(1000);
			$('.bg-lite').css('background','aliceblue');
			$('.bg-lite-r').css('background','none').show();
		});
	});
	$('#btn-logout').on('click',function (e) {
		logoutUser();
		e.preventDefault();
	});

}
window.onload = function() {
	initApp();
};