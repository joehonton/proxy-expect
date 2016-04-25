# ProxyExpect
This is a surrogate for the real 'expect' function for cases where a class object is serialized.

## Scoped package
This is a scoped package. Be sure to use the @joezone prefix for both your package dependency and any require statements.

	"dependencies": {
	  "@joezone/proxy-expect": "^0.9.1"
	}
	 
	require('@joezone/proxy-expect') 

## proxyExpect()

The proxyExpect function returns true if the first parameter's 'jsClassName' is equal to the value of the second parameter.
It logs a message to the console, and returns false, whenever an unexpected class name is encountered.

`Boolean expect(Object object, String expectedClassName, String message)`  
`@param object` is the object to test.
`@param expectedClassName` is the expected value of the object's 'jsClassName' property.
`@param message` (optional) is a string to write with the console message if the variable is not of the expected type.  
`@return` true if the expected type was found, false if not.  

## Cookbook
  
	class Complex {   
		this.jsClassName = 'Complex';  
		};  
	...	 
	var complex = new Complex();  
	... 	
	proxyExpect(complex, 'Complex');  