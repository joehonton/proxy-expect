//=============================================================================
//
// File:         /joezone/proxy-expect.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-SA 4.0
// Initial date: Sep 13, 2015
// Contents:     This is a surrogate for the real 'expect' function for cases
//               where a class object is serialized for use over a socket and
//               the defined type is turned into an anonymous object.
//               In order to use this surrogate fuction, define a class property
//               called 'jsClassName' whose value is set in the constructor
//               to be equal to the real class name.
//
//=============================================================================

"use strict";

class ProxyExpect {
	
	constructor() {
	}
	
	//^ Check to make sure the given argument is of the expected type, and write an entry when it's not
	//> obj is an anonymous Object to check, with a 'jsClassName' property
	//> expectedType is a string containing the expected class name
	//> message to display if expectation not met
	//< true if the expectation was met, false if not
	//
	expect(obj, expectedType, message) {
		message = message || '';
	
		if (obj === undefined)
			process.stderr.write(`[*EXPECT*]${this.getFunctionName(4)} Expected 'Object', but got 'undefined' ${message}\n`);
		else if (obj === null)
			process.stderr.write(`[*EXPECT*]${this.getFunctionName(4)} Expected 'Object', but got 'null' ${message}\n`);
		else if (obj.constructor.name != 'Object')
			process.stderr.write(`[*EXPECT*]${this.getFunctionName(4)} Expected 'Object', but got '${obj.constructor.name}' ${message}\n`);
		else if (obj.jsClassName === undefined)
			process.stderr.write(`[*EXPECT*]${this.getFunctionName(4)} Expected 'jsClassName' to be a String, but got 'undefined' ${message}\n`);
		else if (obj.jsClassName === null)
			process.stderr.write(`[*EXPECT*]${this.getFunctionName(4)} Expected 'jsClassName' to be a String, but got 'null' ${message}\n`);
		else if (obj.jsClassName.constructor.name != 'String')
			process.stderr.write(`[*EXPECT*]${this.getFunctionName(4)} Expected 'jsClassName' to be a String, but got '${obj.jsClassname.constructor.name}' ${message}\n`);
		else if (expectedType.constructor.name != 'String')
			process.stderr.write(`[*EXPECT*]${this.getFunctionName(4)} Expected 'expectedType' to be a String, but got '${expectedType.constructor.name}' ${message}\n`);
		else if (obj.jsClassName != expectedType)
			process.stderr.write(`[*EXPECT*]${this.getFunctionName(4)} Expected '${expectedType}', but got '${obj.jsClassName}' ${message}\n`);
		else
			return true;
		
		return false;
	}
	
	//^ Take a snapshot of the stack and return the line number of the zero-indexed item in it
	getFunctionName(depth) {
		// create an Error object, but don't throw it
		var stackTraceLine = (new Error).stack.split("\n")[depth];
		
		// extract the function name from the backtrace (assuming the backtrace pattern adopted by "node")
		var regex1 = /at (.*) ?\(/g;
		var matches = regex1.exec(stackTraceLine);
		var desiredOutput = '';
		if (matches.length > 1)
			desiredOutput += matches[1].trim();
		desiredOutput = this.rightAlign(desiredOutput, 30);
		return `{${desiredOutput}}`;
	}
	
	//^ Right align the given string to fit within a fixed width character column
	rightAlign(s, width) {
		var columnLen = width;
		var stringLen = s.length;
		if (stringLen > columnLen)
			return s.substr(0,columnLen-3) + '...';
		else
			return Array(columnLen+1 - stringLen).join(' ') + s;
	}

}

module.exports = function(obj, expectedType, message) {
	var proxyExpect = new ProxyExpect();
	return proxyExpect.expect(obj, expectedType, message);
	}

