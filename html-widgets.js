/*	HTML Widgets
	================================================
	JavaScript Widgets for HTML Elements
		type=radio			attribute=…	[element=…	]		[all=false]
		type=checkbox		attribute=…	[element=…	]
		[type=toggle]		attribute=…
	================================================ */

	document.addEventListener("DOMContentLoaded",function() {
		checkToggle();
//		test();	
	});
	
	function test() {
		var thing=3;
		document.body.addEventListener('click',doit,false);
		function doit() {
			alert(thing)
		}
	}
	
	if (window.NodeList && !NodeList.prototype.forEach) {
		NodeList.prototype.forEach = function (callback, thisArg) {
			thisArg = thisArg || window;
			for(var i=0;i<this.length;i++) {
				callback.call(thisArg,this[i],i,this);
			}
		};
	}

	function parseQueryString(/*strings*/) {
		var strings=Array.prototype.slice.call(arguments);
		var data={};
		strings.forEach(function(string) {
			if(!string) return;
			string=string.split(/&|;| /);
			string.forEach(function(value) {
				value=value.split('=');
				if(value[1]===undefined) value[1]=true;
				data[value[0]]=value[1];
			});
		});
		return data;
	}

	function checkToggle() {
		//	Toggle
			var toggles=document.querySelectorAll('[data-hx-toggle],[data-toggle]');
			if(!toggles) return;
			var selectedRadio=null;
			var selectedToggle=null;
			var thing=3;
			toggles.forEach(function(toggle) {
				var elements=null;
				var allOff=false;
				var attribute;
				var data=parseQueryString(toggle.dataset.hxToggle,toggle.dataset.toggle);
				switch(data.type) {
					case 'radio':
						elements=data.element?toggle.querySelectorAll(data.element):toggle.children;
						if(!elements) return;
						attribute=data.attribute||'selected';
						allOff=data.all||false;
						var selected=null;
						Array.from(elements).forEach(function(element) {
							element.onclick=function() {	// inline to utilise closure
								if(this==selected) {
									if(allOff) selected=this.removeAttribute(attribute);
									return;
								}
								if(selected) selected.removeAttribute(attribute);
								selected=this;
								selected.setAttribute(attribute,true);
							};
						});
						break;
					case 'checkbox':
						elements=data.element?toggle.querySelectorAll(data.element):toggle.children;
						if(!elements) return;
						attribute=data.attribute||'selected';
						Array.from(elements).forEach(function(element) {
							element.onclick=function() {
								if(!this.hasAttribute(attribute)) {
									this.setAttribute(attribute,true);
								}
								else this.removeAttribute(attribute);
							};
						});
						break;
					default:
						attribute=Object.keys(data)[0]||'selected';
						toggle.onclick=doToggle;
				}
				function doToggle(event) {
					if(this===selectedToggle) {
						selectedToggle=null;
						return;
					}
					this.setAttribute(attribute,true);
					selectedToggle=this;
					window.addEventListener('click',clickOff,true);
					
					function clickOff(event) {
						selectedToggle.removeAttribute(attribute);
						if(event.target!==selectedToggle) selectedToggle=null;
						window.removeEventListener('click',clickOff,true);
					}
				}
			});
	}
