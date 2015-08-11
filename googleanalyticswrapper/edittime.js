﻿function GetPluginSettings()
{
	return {
		"name":			"Google Analytics Wrapper",			// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"Google_Analytics_Wrapper",			// this is used to identify this plugin and is saved to the project; never change it
		"version":		"0.0.1",				// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"Wrapper plugin for functions of Cordova Google Plugin Analytics https://github.com/danwilson/google-analytics-plugin",
		"author":		"ZentSoft",
		"help url":		"Zentsoft.com",
		"category":		"Analytics",				// Prefer to re-use existing categories, but you can set anything here
		"type":			"object",				// either "world" (appears in layout and is drawn), else "object"
		"rotatable":	false,					// only used when "type" is "world".  Enables an angle property on the object.
		"flags":		pf_singleglobal //0						// uncomment lines to enable flags...
					//	| pf_singleglobal		// exists project-wide, e.g. mouse, keyboard.  "type" must be "object".
					//	| pf_texture			// object has a single texture (e.g. tiled background)
					//	| pf_position_aces		// compare/set/get x, y...
					//	| pf_size_aces			// compare/set/get width, height...
					//	| pf_angle_aces			// compare/set/get angle (recommended that "rotatable" be set to true)
					//	| pf_appearance_aces	// compare/set/get visible, opacity...
					//	| pf_tiling				// adjusts image editor features to better suit tiled images (e.g. tiled background)
					//	| pf_animations			// enables the animations system.  See 'Sprite' for usage
					//	| pf_zorder_aces		// move to top, bottom, layer...
					//  | pf_nosize				// prevent resizing in the editor
					//	| pf_effects			// allow WebGL shader effects to be added
					//  | pf_predraw			// set for any plugin which draws and is not a sprite (i.e. does not simply draw
												// a single non-tiling image the size of the object) - required for effects to work properly
	};
};

////////////////////////////////////////
// Actions

AddStringParam("Screen", "Enter the title of Screen View.", "\"Some Screen View\"");
AddAction(0, af_none, "Track View", "Tracking Functions", "Track View", "Track Screen View", "trackView");

AddStringParam("Category", "Enter the Event Name.", "\"Some Category\"");
AddStringParam("Action", "Enter the Action Name.", "\"Some Action\"");
AddStringParam("Label", "Enter the Label Name.", "\"Some Label\"");
AddNumberParam("Value", "Enter the Numeric Value.", initial_string = "0");
AddAction(1, af_none, "Track Event", "Tracking Functions", "Track Event", "Track Event", "trackEvent");

AddStringParam("Description", "Enter the Exception Description.", "\"Some Exception Description\"");
AddComboParamOption("true");
AddComboParamOption("false");
AddComboParam("Fatal", "Choose value for the Fatal.");
AddAction(2, af_none, "Track Exception", "Tracking Functions", "Track Exception", "Track Exception", "trackException");

////////////////////////////////////////
// Expressions

// AddExpression(id,			// any positive integer to uniquely identify this expression
//				 flags,			// (see docs) ef_none, ef_deprecated, ef_return_number, ef_return_string,
//								// ef_return_any, ef_variadic_parameters (one return flag must be specified)
//				 list_name,		// currently ignored, but set as if appeared in event wizard
//				 category,		// category in expressions panel
//				 exp_name,		// the expression name after the dot, e.g. "foo" for "myobject.foo" - also the runtime function name
//				 description);	// description in expressions panel

// example
AddExpression(0, ef_return_number, "Leet expression", "My category", "MyExpression", "Return the number 1337.");

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin

var property_list = [
	new cr.Property(ept_text, 	"Tracking ID",		"UA-XXXX-YY",		"An example Tracking ID.")
	];
	
// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
	return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	// Save the constructor parameters
	this.instance = instance;
	this.type = type;
	
	// Set the default property values from the property table
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
		
	// Plugin-specific variables
	// this.myValue = 0...
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function()
{
}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function()
{
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function(renderer)
{
}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function(renderer)
{
}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function(renderer)
{
}