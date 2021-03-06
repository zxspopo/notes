    function stopBubble(e) {
	    //濡傛灉鎻愪緵浜嗕簨浠跺璞★紝鍒欒繖鏄竴涓潪IE娴忚鍣? 
	    if (e && e.stopPropagation) {
	        //鍥犳瀹冩敮鎸乄3C鐨剆topPropagation()鏂规硶  
	        e.stopPropagation();
	        if (e && e.preventDefault)
	            e.preventDefault();
	    } else {
	        //鍚﹀垯锛屾垜浠渶瑕佷娇鐢↖E鐨勬柟寮忔潵鍙栨秷浜嬩欢鍐掓场
	        window.event.cancelBubble = true;
	    }
	    return false;
    }

    function getImgTop(img) {
    	if (!img)
    		return;
    	//
    	var top = img.offsetTop;
    	var parent = img.offsetParent;
    	while (parent.offsetTop) {
    		top += parent.offsetTop;
    		parent = parent.offsetParent;
    	}
    	//
    	return top;
    }
    
    function getImgLeft(img) {
    	if (!img)
    		return;
    	//
    	var left = img.offsetLeft;
    	var parent = img.offsetParent;
    	while (parent.offsetLeft) {
    		left += parent.offsetLeft;
    		parent = parent.offsetParent;
    	}
    	//
    	return left;
    }

    var handleSuffix = ['lt', 'tm', 'rt', 'rm', 'rb', 'bm', 'lb', 'lm'];
    function setElementSize(x, y, width, height, handle) {
    	if (!handle)
    		return;
    	//
    	handle.style.left = x + 'px';
    	handle.style.top = y + 'px';
    	handle.style.width = width + 'px';
    	handle.style.height = height + 'px';
    }
    var resizingHanlde = '';
    WIZ_IMG_DRAGRESIZE = 'wizimgdragresize';
    WIZ_IMG_DRAGRESIZE_RATE = 'wizimgdragresize_rate';
    WIZ_IMG_DRAGRESIZE_NAME = 'wizimgdragresize_name';
    WIZ_STYLE = 'wiz_style';
    WIZ_IMG_DRAGRESIZE_HANDLE_CLASS_BASE = WIZ_IMG_DRAGRESIZE + ' ' + WIZ_IMG_DRAGRESIZE + '-';
    //
	var startOffsetX;
	var startOffsetY;
	//
	var cursorOri = document.body.style.cursor;
	var cursor;
    function onHandleMouseDown(e) {
		var elm = e.target || e.srcElement;
		//
		resizingHanlde = elm.className.replace(WIZ_IMG_DRAGRESIZE_HANDLE_CLASS_BASE, '');
		//
		stopBubble(e);
		// console.log('onHandleMouseDown');
		var imgs = document.getElementsByName(WIZ_IMG_DRAGRESIZE_NAME);
		if (imgs && imgs.length > 0) {
			var img = imgs[0];
			//
			var mousex = e.pageX;
			var mousey = e.pageY;
			//
	    	switch(resizingHanlde) {
				case 'lt':
					startOffsetX = getImgLeft(img) - mousex;
					startOffsetY = getImgTop(img) - mousey;
					//
					oppCornerX = getImgLeft(img) + img.width;
					oppCornerY = getImgTop(img) + img.height;
					//
					cursor = 'nw-resize';
				break;
				case 'tm':
					startOffsetX = undefined;
					startOffsetY = getImgTop(img) - mousey;
					//
					cursor = 'n-resize';

				break;
				case 'rt':
					startOffsetX = mousex - img.width - getImgLeft(img);
					startOffsetY = getImgTop(img) - mousey;
					//
					oppCornerX = getImgLeft(img);
					oppCornerY = getImgTop(img) + img.height;
					//
					cursor = 'ne-resize';
				break;
				case 'rm':
					startOffsetX = mousex - img.width - getImgLeft(img);
					startOffsetY = undefined;
					//
					cursor = 'e-resize';
				break;
				case 'rb':
					startOffsetX = mousex - img.width - getImgLeft(img);
					startOffsetY = mousey - img.height - getImgTop(img);
					//
					cursor = 'se-resize';
				break;
				case 'bm':
					startOffsetX = undefined;
					startOffsetY = mousey - img.height - getImgTop(img);
					//
					oppCornerX = getImgLeft(img) / 2;
					oppCornerY = getImgTop(img);				
					//
					cursor = 's-resize';
				break;
				case 'lb':
					startOffsetX = getImgLeft(img) - mousex;
					startOffsetY = mousey - img.height - getImgTop(img);
					//
					oppCornerX = getImgLeft(img) + img.width;
					oppCornerY = getImgTop(img);
					//
					cursor = 'sw-resize';
				break;
				case 'lm':
					startOffsetX = getImgLeft(img) - mousex;
					startOffsetY = undefined;
					//
					cursor = 'w-resize';
				break;		   		
	    	}
		}
    }
    function setHandleSize(img, handle) {
    	if (!img || !handle)
    		return;
    	//
    	var x = getImgLeft(img), y = getImgTop(img), width = img.width, height = img.height;
    	//
    	var handleName = handle.className.replace(WIZ_IMG_DRAGRESIZE_HANDLE_CLASS_BASE, '');
    	//
    	switch(handleName) {
			case 'lt':
				setElementSize(x - 7, y - 7, 5, 5, handle);
			break;
			case 'tm':
				setElementSize(x + (width - 7)/2, y - 7, 5, 5, handle);
			break;
			case 'rt':
				setElementSize(x + width, y - 7, 5, 5, handle);
			break;
			case 'rm':
				setElementSize(x + width, y + (height - 7)/2, 5, 5, handle);
			break;
			case 'rb':
				setElementSize(x + width, y + height, 5, 5, handle);
			break;
			case 'bm':
				setElementSize(x + (width - 7)/2, y + height, 5, 5, handle);			
			break;
			case 'lb':
				setElementSize(x - 7, y + height, 5, 5, handle);
			break;
			case 'lm':
				setElementSize(x - 7, y + (height - 7)/2, 5, 5, handle);
			break;		   		
    	}
    }
	function resetHandlesSize(img) {
		if (!img)
			return;
		var handles = document.getElementsByClassName(WIZ_IMG_DRAGRESIZE);
		if (!handles || handles.length < 0)
			return;
		//
		for (var i = 0; i < handles.length; i ++) {
			var handle = handles[i];
			setHandleSize(img, handle);
			//
			handle.style.visibility = 'inherit';
		}
	}    
    function createHandles(img) {
    	if (!img)
    		return;
    	//
		for (var i = 0; i < handleSuffix.length; i ++) {
			var handle = document.createElement('div');
			handle.className = WIZ_IMG_DRAGRESIZE_HANDLE_CLASS_BASE + handleSuffix[i];
			//
			document.body.appendChild(handle);
			handle.setAttribute(WIZ_STYLE, 'unsave');
			//
			setHandleSize(img, handle);
		}    	
    }
    function removeImgAttributes() {
     	var imgs = document.getElementsByName(WIZ_IMG_DRAGRESIZE_NAME);
    	if (imgs && imgs.length > 0) {
    		var img0 = imgs[0];
    		//
    		img0.name = img0.attributes[WIZ_IMG_DRAGRESIZE_NAME] ? img0.attributes[WIZ_IMG_DRAGRESIZE_NAME] : '';
    	}   	
    }

	function removeHandles() {
		var handles = document.getElementsByClassName(WIZ_IMG_DRAGRESIZE);
		if (!handles || handles.length < 1)
			return;
		//
		while(handles.length) {
			var handle = handles[handles.length - 1];
			handle.remove();
		}
	}
	    
    function initImage(img) {
    	if (!img)
    		return;
    	removeImgAttributes();
    	//
		img.attributes[WIZ_IMG_DRAGRESIZE_RATE] = img.width / img.height;
		//
		if (img.name)
			img.attributes[WIZ_IMG_DRAGRESIZE_NAME] = img.name;
		//
		img.name = WIZ_IMG_DRAGRESIZE_NAME;
    }    
	function initImageDragResize(img) {
		if (!img || !img.tagName || img.tagName.toLowerCase() != 'img')
			return;
		//
		var handles = document.getElementsByClassName(WIZ_IMG_DRAGRESIZE);
		if (!handles || handles.length < 1)
			createHandles(img);
		else { 
			resetHandlesSize(img);
		}
		//
		initImage(img);
		//
		if (handles && handles.length > 0) {
			for (var i = 0; i < handles.length; i ++) {
				var handle = handles[i];
				handle.removeEventListener('mousedown', onHandleMouseDown);
				handle.addEventListener('mousedown', onHandleMouseDown);
			}
		}
	}
	var lastMousex;
	var lastMousey;
	function showHandles(show) {
		var handles = document.getElementsByClassName(WIZ_IMG_DRAGRESIZE);
		if (!handles || handles.length < 1)
			return;
		//
		for (var i = 0; i < handles.length; i ++) {
			var handle = handles[i];
			//
			handle.style.visibility = show ? 'inherit' : 'hidden';
		}
	}
	function scaleImgSize(rate, widthDraged, heightDraged, img) {
		if (!img)
			return;
		//
		var widthSized = heightDraged * rate;
		var heightSized = widthDraged / rate;
		//
		if (widthSized < widthDraged)
			widthSized = widthDraged;
		else
			heightSized = heightDraged;
		//
		img.width = widthSized;
		img.height = heightSized;
	}
	var oppCornerX;
	var oppCornerY;	
    function onHandleMouseMove(e) {
    	var imgs = document.getElementsByName(WIZ_IMG_DRAGRESIZE_NAME);
    	if (imgs && imgs.length > 0) {
    		var img = imgs[0];
	    	//
	    	if (resizingHanlde) {
	    		//
	    		var mousex = e.pageX;
	    		var mousey = e.pageY;
	    		//
	    		document.body.style.cursor = cursor;
	    		// console.log('mousex: ' + mousex + ', mousey: ' + mousey);
	    		// console.log('lastMousex: ' + lastMousex + ', lastMousey: ' + lastMousey);
	    		var rate;
	    		var widthDraged;
	    		var heightDraged;
	    		var widthSized;
	    		var heightSized;
	    		//
	    		if (!lastMousex || !lastMousey) {
	    			lastMousex = mousex;
	    			lastMousey = mousey;
	    		}
	    		//
				switch (resizingHanlde) {
					case 'tm':
						img.width = img.width;
						//
						if (mousey < getImgTop(img)) {
							img.height += lastMousey - mousey;
						}
						else {
							heightSized = img.height - (mousey - lastMousey) - startOffsetY;
							img.height = heightSized < 0 ? 0 : heightSized;
						}
					break;
					case 'rm':
						widthSized = mousex - getImgLeft(img) - startOffsetX;
						img.width = widthSized < 0 ? 0 : widthSized;
						img.height = img.height;
						//
						img.attributes[WIZ_IMG_DRAGRESIZE_RATE] = img.width / img.height;
					break;
					case 'bm':
						img.width = img.width;
						heightSized = mousey - oppCornerY - startOffsetY;
						img.height = heightSized < 0 ? 0 : heightSized;
						//
						img.attributes[WIZ_IMG_DRAGRESIZE_RATE] = img.width / img.height;
					break;
					case 'lm':
						//
						img.height = img.height;
						//
						if (mousex < getImgLeft(img)) {
							img.width += lastMousex - mousex;
						}
						else {
							widthSized = img.width - (mousex - lastMousex) - startOffsetX;
							img.width = widthSized < 0 ? 0 : widthSized;
						}
					break;
					case 'lt':
						rate = Number(img.attributes[WIZ_IMG_DRAGRESIZE_RATE]);
						//
						widthDraged = oppCornerX - mousex;
						heightDraged = oppCornerY - mousey;
						//
						widthDraged -= startOffsetX;
						heightDraged -= startOffsetY;
						//
						widthDraged = widthDraged < 0 ? 0 : widthDraged;
						heightDraged = heightDraged < 0 ? 0 : heightDraged;
						//
						scaleImgSize(rate, widthDraged, heightDraged, img);
					break;
					case 'rt':
						rate = Number(img.attributes[WIZ_IMG_DRAGRESIZE_RATE]);
						//
						widthDraged = mousex - oppCornerX;
						heightDraged = oppCornerY - mousey;
						//
						widthDraged -= startOffsetX;
						heightDraged -= startOffsetY;
						//
						widthDraged = widthDraged < 0 ? 0 : widthDraged;
						heightDraged = heightDraged < 0 ? 0 : heightDraged;
						//
						scaleImgSize(rate, widthDraged, heightDraged, img);
					break;
					case 'lb':
						rate = Number(img.attributes[WIZ_IMG_DRAGRESIZE_RATE]);
						//
						widthDraged = oppCornerX - mousex;
						heightDraged = mousey - oppCornerY;
						//
						widthDraged -= startOffsetX;
						heightDraged -= startOffsetY;
						//
						widthDraged = widthDraged < 0 ? 0 : widthDraged;
						heightDraged = heightDraged < 0 ? 0 : heightDraged;
						//
						scaleImgSize(rate, widthDraged, heightDraged, img);
					break;
					case 'rb':
						rate = Number(img.attributes[WIZ_IMG_DRAGRESIZE_RATE]);
						// console.log('mousex: ' + mousex + 'mousey: ' + mousey);
						widthDraged = mousex - getImgLeft(img);
						heightDraged = mousey - getImgTop(img);
						//
						widthDraged -= startOffsetX;
						heightDraged -= startOffsetY;
						//
						widthDraged = widthDraged < 0 ? 0 : widthDraged;
						heightDraged = heightDraged < 0 ? 0 : heightDraged;
						//
						scaleImgSize(rate, widthDraged, heightDraged, img);
						//
						// console.log('rate: ' + rate + ', ' + 'widthDraged: ' + widthDraged + ', ' + 'heightDraged: ' + heightDraged + ', ' + 'widthSized: ' + 
						// 	widthSized + ', ' + 'heightSized: ' + heightSized);
					break;								
				}
				lastMousex = mousex;
				lastMousey = mousey;
				//
				resetHandlesSize(img);
	    	}
    	}
    }
	function onDocumentMouseUp(e) {
		var elm = e.target || e.srcElement;
		if (elm && elm.tagName && elm.tagName.toLowerCase() == 'img') {
			initImageDragResize(elm);
			//
		}
		//
		resizingHanlde = '';
		//
		lastMousex = undefined;
		lastMousey = undefined;
		//
		oppCornerX = undefined;
		oppCornerY = undefined;
		//
		startOffsetX = undefined;
		startOffsetY = undefined;
		//
		document.body.style.cursor = cursorOri;
	}
    function onDocumentMouseDown(e) {
    	showHandles(false);
    	//
    	removeImgAttributes();
    }
    function onDocumentKeyDown(e) {
    	showHandles(false);
    }
	function onLoad () {
		document.removeEventListener('mouseup', onDocumentMouseUp);
		document.addEventListener('mouseup', onDocumentMouseUp);
		//
		document.removeEventListener('mousemove', onHandleMouseMove);
		document.addEventListener('mousemove', onHandleMouseMove);
		//
		document.removeEventListener('mousedown', onDocumentMouseDown);
		document.addEventListener('mousedown', onDocumentMouseDown);
		//
		document.removeEventListener('keydown', onDocumentKeyDown);
		document.addEventListener('keydown', onDocumentKeyDown);
	}
	
	onLoad();

	function onPluginGetHtml() {
		removeImgAttributes();
		//
		removeHandles();
		//
		document.body.style.cursor = cursorOri;
	}
