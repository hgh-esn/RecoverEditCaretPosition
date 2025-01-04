/**
 *
 * @package	Joomla.Site
 * @subpackage 	com_content
 * System 	Plugin
 * @copyright  	Hans-Guenter Heiserholt {@link http://www.moba-hgh.de}
 * @author     	Hans-Guenter Heiserholt / Created on 01-Jan-2025
 * @license    GNU/GPL Public License version 2 or later
 */
  
/* 
 * JavaScript behavior to allow remember/set the last position in edit-window
 */
// Set variables
// bname = name of qookie 
	
	bname = 'lastCaretPosq';

/*        
function getDocPos() {

	// window.scrollto(0,400);
    alert('getDocPos: pageXOffset: ' + window.pageXOffset + ', pageYOffset: ' + window.pageYOffset);  
	   
	var bvalue = window.pageYOffset;
	var exdays = 1;
	   
	delete_cookie(bname);
	setCookie(bname, bvalue, exdays);
}
*/

function setCookie(name, value, exdays) {
 
//  	alert('setCookie: ' + name + ' ' + value + ' ' + exdays);
 
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));   // exdays = 1 day
	var expires = 'expires='+d.toUTCString();
	document.cookie = name + '=' + value + '; ' + expires;
	return;
}

function getCookie(name) {
		
	var name = name + '=';
	var ca = document.cookie.split(';');
	alert('getCookie: ca= ' +ca);
	for (var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) != -1) {
		// 	alert('getCookie: ' + 'name-lenght= ' + name.length + ' c-lenght= ' + c.length);			   
			return c.substring(name.length, c.length);
		}
	}
	return '';
}
	
	function delete_cookie(name) {
		document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
	
// var pos = getCaretPos(document.getElementById('myId')); // pure JS
// var pos = getCaretPos($('#myId')[0], 10);  // jQuery

// Definition   http://dailydevbook.de/2013/01/24/javascript-caret-position-setzen-und-auslesen/
function getCaretPos(domElem) {
	var pos ='';
	alert('Fkt-getCaretPos');
	
	if (document.selection) {
		alert('getCaretPos: Selection');
		domElem.focus();
		var sel = document.selection.createRange();
		sel.moveStart('character', - domElem.value.length);
		pos = sel.text.length;
	}
	else {
		alert('Fkt-getCaretPos: noSelection');
	//	if (domElem.selectionStart || domElem.selectionStart == '0') { 
		if (domElem.selectionStart == '0' || domElem.selectionEnd == '0') { // chg by HGH
			pos = domElem.selectionStart;
			alert('Fkt-getCaretPos: pos-domElem.selectionStart ' +pos);
		}
	}
//	pos=200;
	alert('getCaretPos-Return ' +pos);
	return pos;
}

// Aufruf
// setCaretPos(document.getElementById('myId'), 10); // pure JS
// setCaretPos($('#myId')[0], 10);  // jQuery

// Definition   http://dailydevbook.de/2013/01/24/javascript-caret-position-setzen-und-auslesen/
function setCaretPos(domElem, pos) {
	alert('Fkt: setCaretPos');
	if(domElem.setSelectionRange) {
    		domElem.focus();
    		domElem.setSelectionRange(pos, pos);
  	}
  	else {
		if (domElem.createTextRange) {
    		var range = domElem.createTextRange();
    		range.collapse(true);
    		range.moveEnd('character', pos);
    		range.moveStart('character', pos);
    		range.select();
		}
  	}
	return;
}

function getCarPos() {
	alert('Fkt1-getCarPos:');
	   
	// var CarPosValue = window.pageYOffset;                    // funktioniert !	
	// alert('CarPosValue[...pageYOffset] geladen: ' +'A:' +CarPosValue); 
	// var CarPosValue = window.scrollY;

	var CarPosValue = getCaretPos(document.getElementById('jform_content')); // pure JS
	alert('Fkt2-getCarPos: CarPosValue[...byId:jform_content] geladen: ' +'A:' +CarPosValue); 
		 
	if (CarPosValue > 0)
	{
		alert('Fkt3-getCarPos: getCarPosValue>0: ' +'B:' +CarPosValue);
	
		var exdays = 1;
		alert('Fkt4-getCarPos: Qookie Name: ' +bname);   
		delete_cookie(bname);
		setCookie(bname, CarPosValue, exdays);
	}
	else 
	{
		alert('bname= ' +bname);
		var posValue = getCookie(bname);  
	  
		alert('Qookie geladen: ' +posValue);   
			
		//window.scrollTo(0, posValue);
		setCaretPos('jform_articletext', posValue);
	};
	return;
 }