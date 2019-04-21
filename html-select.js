/*	Select
	================================================
	JavaScript Widgets for HTML Elements
		type=radio			attribute=…	[element=…	]		[all=false]
		type=checkbox		attribute=…	[element=…	]
		[type=toggle]		attribute=…
	================================================ */

	document.addEventListener("DOMContentLoaded",function() {
		checkSelect();
	});
	
	if (window.NodeList && !NodeList.prototype.forEach) {
		NodeList.prototype.forEach = function (callback, thisArg) {
			thisArg = thisArg || window;
			for(var i=0;i<this.length;i++) {
				callback.call(thisArg,this[i],i,this);
			}
		};
	}
	
	NodeList.prototype.freach=Array.prototype.forEach;

	function checkSelect() {
		//	Toggle
			var toggles=document.querySelectorAll('[data-toggle],[data-toggle-attribute],[data-toggle-classes]');
			if(!toggles) return;
			var selectedToggle=null;
			toggles.freach(function(toggle) {
				var attribute=toggle.dataset.toggle;
				toggle.onclick=function doToggle(event) {
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
				};
			});
			

	}
