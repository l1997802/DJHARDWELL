	HTMLElement.prototype.__defineGetter__("currentStyle", function () { 
	    return this.ownerDocument.defaultView.getComputedStyle(this, null); 
	});	
	var shortcuts = document.querySelector(".shortcuts");
	shortcuts.onselectstart = function(){
		return false;
	}
	var shortcutsWords = document.querySelector(".shortcuts-words");
	var shortcutsFlag = true;
	var shortcutsHoverColor = function(flag){
		if(flag){
			shortcuts.onmouseenter = function(){};
			shortcuts.onmouseleave = function(){};
			shortcuts.style.color = shortcuts.children[0].style.color = "#fff";
		}else{
			shortcuts.style.color = shortcuts.children[0].style.color = "rgba(255,255,255,.4)";
			shortcuts.onmouseenter = function(){
				this.style.color = this.children[0].style.color = "rgba(255,255,255,.4)";
				this.children[0].style.border = "2px solid rgba(255,255,255,.3)";
			}
			shortcuts.onmouseleave = function(){
				this.style.color = this.children[0].style.color = "rgba(255,255,255,.3)";
				this.children[0].style.border = "2px solid rgba(255,255,255,.2)";
			}
		}
	}
	shortcutsHoverColor(!shortcutsFlag);
	shortcuts.style.color = shortcuts.children[0].style.color = "rgba(255,255,255,.3)";
	var showShortcuts = function(flag){
		if(flag){
			shortcutsWords.style.display = "block";
			shortcutsHoverColor(flag);
		}else{
			shortcutsWords.style.display = "none";
			shortcutsHoverColor(flag);
		}
		shortcutsFlag = !shortcutsFlag;
	}
	shortcuts.onclick = function(e){
		e.stopPropagation();
		showShortcuts(shortcutsFlag);
	}
	window.onclick = function(){
		if(!shortcutsFlag){
			showShortcuts(shortcutsFlag);
		}
	}
	shortcutsWords.onclick = function(e){
		e.stopPropagation();
	}
	window.onkeyup = function(e){
		if(e.keyCode == 37||e.keyCode == 38||e.keyCode == 39||e.keyCode == 40){
			keyboardArrowMove(e.keyCode);
		}
		if(e.keyCode == 83){
			showShortcuts(shortcutsFlag);
			if(shortcutsFlag){
				shortcuts.style.color = shortcuts.children[0].style.color = "rgba(255,255,255,.3)";
				shortcuts.children[0].style.border = "2px solid rgba(255,255,255,.2)";
			}
		}
		if(e.keyCode == 65){
			if(!viewAllFlag){
				hoverColor(1,yearsLis,"#f75d8c","#f42d6a");
				viewAllFlag = true;
				albumsLiDetails(albumsX1[0].x,albumsX1[0].y,albumsX1[0]);
				yearsRender(2019);
				showAlbumsInformation(albumsX1[0].index);
			}else{
				hoverColor(0,yearsLis,"#f75d8c","#f42d6a");
				viewAllFlag = false;
				albumsLiDetails();
				yearsRender(2020);
				showAlbumsInformation();
			}
		}
	}
//	专辑部分
	var screenWidth = document.querySelector("body").offsetWidth;
	var screenHeight = document.documentElement.clientHeight;
	var screenRatio = screenWidth/1347;
	var albumsBgc = document.querySelector(".albums-bgc");
	var albums = document.querySelector(".albums");
	var albumsUl = albums.children;
	var albumsPadding = parseInt(albumsBgc.currentStyle.paddingLeft);
	var albumsLi = document.getElementById("album_li_test");
	var albumsLiMargin = parseInt(albumsLi.currentStyle.margin);
	var albumsLiWidth = albumsLi.offsetWidth;
	var albumsLiHeight = albumsLi.offsetHeight;
//	104和6皆为系数
	var albumsColumn = Math.floor((screenWidth - 2*albumsPadding)/(((104 + 6 + 2*albumsLiMargin*0.35))*screenRatio));
	albums.style.width = (albumsLiWidth + 2*albumsLiMargin)*albumsColumn + "px";
	var albumsLis = [];
	var albumsYear = 2019;
	var albumsY = 0;
	for(i=0;i<albums.children.length;i++){
		var albumsX = 0;
		var albumsChild = albums.children[i];
		for(j=0;j<albumsChild.children.length;j++){
			if(albumsX == albumsColumn){
				albumsX = 0;
				albumsY++;
			}
//			22为系数
			albumsChild.children[j].children[2].style.bottom = - albumsChild.children[j].children[2].offsetHeight - 22 + "px";
			albumsChild.children[j].x = albumsX;
			albumsChild.children[j].y = albumsY;
			albumsChild.children[j].year = albumsYear;
			albumsLis.push(albumsChild.children[j]);
			albumsX++;
		}
		albumsYear--;
		albumsY++;
	}
	var bigAlbumsPadding = screenWidth/2 - albumsLiWidth/2 - albumsLiMargin - albumsPadding;
	var firstAlbumsPaddingTop = parseInt(albumsBgc.currentStyle.paddingTop);
	var bigAlbumsWidth = (albumsLiWidth + 2*albumsLiMargin)*albumsColumn + albumsPadding*2;
	var albumsRatio = Math.floor(((screenWidth - 2*albumsPadding)/bigAlbumsWidth)*100000)/100000
	
	//	补上下播放器宽度
	albums.style.transform = "scale("+ albumsRatio +")";
	albumsBgc.style.height = Math.floor(albums.offsetHeight*albumsRatio*100)/100 + "px";
	var singleAlbumsLiSize = albumsLiHeight + 2*albumsLiMargin;
	var rollingBarWidth = window.innerWidth - screenWidth;//浏览器滚动条宽度
	var viewAllFlag = false;
	var currentX = 0;
	var currentY = 0;
	var albumsLiDetails = function(x,y,ele){
		if(viewAllFlag){
			$('html,body').animate({scrollTop:0}, 300);
			document.querySelector("body").style.overflow = "hidden";
			currentX = x;
			currentY = y;
			for(i=0;i<albumsLis.length;i++){
				if(albumsLis[i].x == x&&albumsLis[i].y == y+1){
					albumsLis[i].style.opacity = 0.1;
				}else{
					albumsLis[i].style.opacity = 0.4;
				}
			}
			ele.style.opacity = 1;
	//		15和657皆为系数       657表示第一次完成网页时该电脑页面的高度
			albums.style.transform = "scale(1) translate(" + (-x*singleAlbumsLiSize + bigAlbumsPadding + rollingBarWidth/2) + "px," + (-y*singleAlbumsLiSize + 15 + (screenHeight - 657)/2) +"px)";
		}else{
			document.querySelector("body").style.overflow = "visible";
			for(i=0;i<albumsLis.length;i++){
				albumsLis[i].style.opacity = 1;
			}
			albums.style.transform = "scale("+ albumsRatio +")";
			$('html,body').animate({scrollTop:0}, 300);
			currentX = 0;
			currentY = 0;
		}
	}
	var albumsLisMask = document.querySelectorAll(".mask");
	var albumsLisInformation = document.querySelectorAll(".albums-information");
	var showAlbumsInformation = function(index){
		for(i=0;i<albumsLisMask.length;i++){
			albumsLisMask[i].style.visibility = "hidden";
			albumsLisMask[i].style.height = albumsLiHeight/2 + "px";
			albumsLisInformation[i].style.visibility = "hidden";
		}
		if(viewAllFlag){
			albumsLisMask[index].style.visibility = "visible";       
			albumsLisInformation[index].style.visibility = "visible";
		}
	}
	
//	年份
	var yearsLis = document.querySelector(".years-main").children;
	var removeAllClass = function(arr,classname){
		for(j=0;j<arr.length;j++){
			arr[j].classList.remove(classname);
		}
	}
	var hoverColor = function(index,arr,entercolor,leavecolor){
		for(i=0;i<arr.length;i++){
			if(i == index){
				arr[index].style.color = "#f5f5f5";
			}else{
				arr[i].style.color = leavecolor;
			}
			arr[i].onmouseenter = function(){
				if(!viewAllFlag&&this.index!==0){
					for(a=0;a<albumsLis.length;a++){
						albumsLis[a].style.opacity = 0.4;
					}
					for(j=0;j<albumsUl[this.index - 1].children.length;j++){
						albumsUl[this.index - 1].children[j].style.opacity = 1;
					}
				}
				if(this.index!==index){
					this.style.color = entercolor;
				}
			}
			arr[i].onmouseleave = function(){
				if(!viewAllFlag&&this.index!==0){
					for(j=0;j<albumsLis.length;j++){
						albumsLis[j].style.opacity = 1;
					}
				}
				if(this.index!==index){
					this.style.color = leavecolor;
				}
			}
		}
	}
	hoverColor(0,yearsLis,"#f75d8c","#f42d6a");
	var albumsX1 = [];
	for(i=0;i<albums.children.length;i++){
		albumsX1.push(albums.children[i].children[0])
	}
	var yearsCircle = [];
	var lineWidth = 0;
	var albumsYear = 2020;
	var yearsBottomLine = document.querySelector(".years-bottom-line-white");
	for(i=0;i<yearsLis.length;i++){
		yearsLis[i].index = i;
		yearsLis[i].year = albumsYear;
		yearsLis[i].onselectstart = false;
		yearsCircle.push(yearsLis[i].children[0]);
		var circleIndex = 0;
		var yearsRender = function(year,i){
			if(i){
				var index = i;
			}else{
				for(i=0;i<yearsLis.length;i++){
					if(yearsLis[i].year == year){
						var index = yearsLis[i].index;
						break;
					}
				}
			}
			if(index !== 0){
				for(j=0;j<albumsX1.length;j++){
					if(albumsX1[j].year == this.year){
						viewAllFlag = true;
						albumsLiDetails(albumsX1[j].x,albumsX1[j].y,albumsX1[j])
						break;
					}
				}
			}else{
				viewAllFlag = false;
				albumsLiDetails();
			}
			removeAllClass(yearsLis,"current-years-li");
			yearsLis[index].style.color = "#fff";
			hoverColor(index,yearsLis,"#f75d8c","#f42d6a");
			yearsBottomLine.style.width = yearsCircle[index].offsetLeft + yearsLis[index].offsetLeft + document.querySelector(".years").offsetLeft + 2 + "px";
			circleIndex = index;
			for(a=0;a<yearsCircle.length;a++){
				if(a<=index){
					yearsCircle[a].style.opacity = 1;
				}else{
					yearsCircle[a].style.opacity = 0;
				}
			}
		}
		yearsLis[i].onclick = function(){
			var index = this.index;
			if(index!=0){
				for(j=0;j<albumsX1.length;j++){
					if(albumsX1[j].year == this.year){
						var li = albumsX1[j];
						break;
					}
				}
				hoverColor(index,yearsLis,"#f75d8c","#f42d6a");
				viewAllFlag = true;
				albumsLiDetails(li.x,li.y,li);
				yearsRender(this.year,index);
				showAlbumsInformation(li.index);
			}else{
				if(!viewAllFlag){
					hoverColor(1,yearsLis,"#f75d8c","#f42d6a");
					viewAllFlag = true;
					albumsLiDetails(albumsX1[0].x,albumsX1[0].y,albumsX1[0]);
					yearsRender(2019);
					showAlbumsInformation(albumsX1[0].index);
				}else{
					hoverColor(0,yearsLis,"#f75d8c","#f42d6a");
					viewAllFlag = false;
					albumsLiDetails();
					yearsRender(2020);
					showAlbumsInformation();
				}
			}
		}
		albumsYear--;
	}
	yearsBottomLine.style.width = yearsCircle[0].offsetLeft + yearsLis[0].offsetLeft + document.querySelector(".years").offsetLeft + "px";
	
//	单个li点击事件
	for(i=0;i<albumsLis.length;i++){
		albumsLis[i].index = i;
		albumsLis[i].onclick = function(){
			viewAllFlag = true;
			albumsLiDetails(this.x,this.y,this);
			yearsRender(this.year);
			showAlbumsInformation(this.index);
		}
	}
	var findAlbum = function(x,y){
		var arr = [];
		for(i=0;i<albumsLis.length;i++){
			if(albumsLis[i].x == x&&albumsLis[i].y == y){
				arr.push(albumsLis[i])
				break;
			}
		}
		return arr[0];
	}
	var keyboardArrowMove = function(keyCode){
		if(viewAllFlag){
			switch(keyCode){
				case 37:
					var liIndex = findAlbum(currentX,currentY).index;
					if(liIndex !== 0){
						var li = albumsLis[liIndex - 1];
						viewAllFlag = true;
						albumsLiDetails(li.x,li.y,li);
						yearsRender(li.year);
						showAlbumsInformation(li.index);
					}
					break;
				case 38:
					var li = findAlbum(currentX,currentY - 1);
					if(li){
						viewAllFlag = true;
						albumsLiDetails(li.x,li.y,li);
						yearsRender(li.year);
						showAlbumsInformation(li.index);
					}
					break;
				case 39:
					var liIndex = findAlbum(currentX,currentY).index;
					if(liIndex !== albumsLis.length - 1){
						var li = albumsLis[liIndex + 1];
						viewAllFlag = true;
						albumsLiDetails(li.x,li.y,li);
						yearsRender(li.year);
						showAlbumsInformation(li.index);
					}
					break;
				case 40:
					if(findAlbum(currentX,currentY + 1)){
						var li = findAlbum(currentX,currentY + 1);
						viewAllFlag = true;
						albumsLiDetails(li.x,li.y,li);
						yearsRender(li.year);
						showAlbumsInformation(li.index);
					}
					break;
			}
		}
	}
	var indexPicture = document.getElementById("index");
	indexPicture.onclick = function(){
		window.location.href = "index.html"
	}
	var topBgc = document.querySelector(".top");
	var side = document.querySelector(".side");
	var yearsBgc = document.querySelector(".years-bgc");
	var sideToggleFlag = false;
	var player = document.querySelector(".player");
	var departments = [topBgc,side,yearsBgc,albumsBgc,player];
	var toggle = document.querySelector(".toggle");
	toggle.onclick = function(){
		sideToggleFlag = !sideToggleFlag;
		if(sideToggleFlag){
			document.querySelector("body").style.overflow = "hidden";
			yearsBottomLine.style.width = yearsCircle[circleIndex].offsetLeft + yearsLis[circleIndex].offsetLeft + document.querySelector(".years").offsetLeft + 2 + "px";
			for(i=0;i<departments.length;i++){
				departments[i].style.transform = "translateX(" + side.offsetWidth + "px)";
			}
			side.style.transform = "translateX(0px) translateY(0px)";
			bar.style.transform = "translateX(" + (side.offsetWidth - 13) + "px) translateY(4px)";
		}else{
			for(i=0;i<departments.length;i++){
				departments[i].style.transform = "translateX(0px)";
			}
			side.style.transform = "translateX(" + -side.offsetWidth + "px) translateY(4px)";
			bar.style.transform = "translateX(-8px)";
			var time = setTimeout(function(){
				document.querySelector("body").style.overflow = "visible";
				yearsBottomLine.style.width = yearsCircle[circleIndex].offsetLeft + yearsLis[circleIndex].offsetLeft + document.querySelector(".years").offsetLeft + 2 + "px";
				bar.style.top = "4px";
			},300)
		}
	}
	var lis = document.querySelector(".sideLi1").children;
	for(i=0;i<lis.length;i++){
		lis[i].onmouseenter = function(){
			this.children[1].classList.add("opa1");
		}
		lis[i].onmouseleave = function(){
			this.children[1].classList.remove("opa1");
		}
	}
	var bar = document.querySelector(".bar");
	if(side.offsetHeight <= screenHeight){
		bar.style.display = "none";
		side.style.height = screenHeight + "px";
	}else{
		bar.style.height = screenHeight - 8 - (side.offsetHeight - screenHeight) + "px";
	}
	side.onmouseenter = function(){
		bar.style.opacity = 1;
	}
	side.onmouseleave = function(){
		bar.style.opacity = 0;
	}
	bar.onmouseenter = function(){
		bar.style.opacity = 1;
		bar.style.backgroundColor = "#fff"
	}
	bar.onmouseleave = function(){
		bar.style.backgroundColor = "#444"
	}
	bar.onmousedown = function(e){
		bar.style.opacity = 1;
		var space = e.clientY - bar.offsetTop;
		bar.classList.remove("transition");
		side.classList.remove("transition");
		document.onmousemove = function(e){
			bar.style.opacity = 1;
			bar.style.backgroundColor = "#fff"
			bar.style.top = e.clientY - space + "px";
			if(bar.offsetTop> screenHeight - 8 - bar.offsetHeight){
				bar.style.top = screenHeight - 8 - bar.offsetHeight + "px";
			}else if(bar.offsetTop<4){
				bar.style.top = "4px";
			}
			side.style.transform = "translateX(0px) translateY(" + (- bar.offsetTop + 4  )+ "px)"
			console.log(bar.offsetTop)
		}
		document.onmouseup = function(){
			bar.style.backgroundColor = "#444"
			document.onmousemove = function(){};
			bar.classList.add("transition");
			side.classList.add("transition");
		}
	}
	console.log(side.offsetHeight)
	document.onselectstart = function(){
		return false;
	}
	var playerBar = document.querySelector(".player-bar");
	var songs = document.querySelector(".songs");
	var playlist = document.querySelector(".playlist");
	var playerFlag = true;
	var playerToggle = document.getElementById("playerToggle");
	playerToggle.onclick = function(){
		if(playerFlag){
			player.style.height = 240 + "px"
		}else{
			player.style.height = 40 + "px"
		}
		playerFlag = !playerFlag;
	}
	player.onmouseleave = function(){
		if(!playerFlag){
			this.style.height = 40 + "px";
			playerFlag = true;
		}
	}
	playerBar.onmousedown = function(e){
		var firstClientY = e.clientY;
		var firstTop = this.offsetTop;
		document.onmousemove = function(e){
			playerBar.style.top = firstTop + e.clientY - firstClientY + "px";
			if(playerBar.offsetTop < 45){
				playerBar.style.top = "45px";
			}
			if(playerBar.offsetTop + playerBar.offsetHeight > 235){
				playerBar.style.top = 235 - playerBar.offsetHeight +"px";
			}
			songs.style.transform = "translateY(" + (-(songs.offsetHeight - playlist.offsetHeight)*((playerBar.offsetTop - 45)/(playlist.offsetHeight - 10 - playerBar.offsetHeight))) + "px)"
			console.log(playlist.currentStyle.height)
		}
	}
	document.onmouseup = function(){
		document.onmousemove = function(){}
	};
	var playBtn = document.querySelectorAll(".playBtn");
	var playFlag = true;
	for(i=0;i<playBtn.length;i++){
		playBtn[i].onclick = function(){
			if(playFlag){
				for(j=0;j<playBtn.length;j++){
					playBtn[j].children[0].classList.remove("icofont-ui-play");
					playBtn[j].children[0].classList.add("icofont-ui-pause");
				}
			}else{
				for(j=0;j<playBtn.length;j++){
					playBtn[j].children[0].classList.remove("icofont-ui-pause");
					playBtn[j].children[0].classList.add("icofont-ui-play");
				}
			}
			playFlag = !playFlag;
		}
	}
