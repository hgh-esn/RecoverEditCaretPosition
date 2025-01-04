<?php
/**
 * System Plugin.
 *
 * @package    RecEditCarPos
 * @subpackage Plugin
 * @author     Hans-Guenter Heiserholt {@link http://www.moba-hgh.de}
 * @author     Created on 01-Jan-2024
 * @license    GNU/GPL Public License version 2 or later
 *
 * 1.0.0 First Edition
 */
 
//-- No direct access

defined( '_JEXEC' ) || die( 'Restricted access' );

jimport( 'joomla.plugin.plugin' );

class plgSystemRecEditCarPos extends JPlugin
{
    /**
     * Constructor
     *
     * @param object $subject The object to observe
     * @param array $config  An array that holds the plugin configuration
     */
     
    var $com_adv_found;
      
    public function __construct(& $subject, $config)
    {
	parent::__construct($subject, $config);
      
        /* ----------------------------------
         * load the language file
         * ---------------------------------- */  
        
	//      $this->loadLanguage();
         
        $language = JFactory::getLanguage();
        $language->load('plg_system_receditcarpos', JPATH_ADMINISTRATOR, 'en-GB', true);
        $language->load('plg_system_receditcarpos', JPATH_ADMINISTRATOR,   null, true);

        /* ----------------------------------
         * load the plugin-params
         * ---------------------------------- */
        
        $params = $this->params;   
	/*
        	$params_0 = $this->params->get('adv_parm_0');           
		echo  '<br /><br /><br />params_0 = ' .$params_0;
	 */ 
 	
	/* ----------------------------------
	 * set load-events
	 * ---------------------------------- */ 

	 	$doc =& JFactory::getDocument();

	 /* ----------------------------------
	  * add js-file
	  * ---------------------------------- */

		$doc->addScript('/plugins/system/receditcarpos/js/receditcarpos.js');
	    
	 /* ----------------------------------
	  * set load-event
	  * ---------------------------------- */  
		
		$content = "window.addEventListener('load', function() {getCarPos();});";  
		$doc->addScriptDeclaration($content);

    }
    
    /**
     * Event onAfterRender
     */
	
    public function onAfterRender() {
	/**************************************************
	 * set the onclick-event to the Save-butten
	 *********************************************** */

	//J3    $html = JResponse::getBody();
	/*J4*/	$html = JFactory::getApplication()->getBody();
		//	echo htmlentities($html);
	/* ----------------------------------
	 * get only the body code in match[0]
	 * ---------------------------------- */

		$regex = '#<body(.*?)</body># sU';
		preg_match($regex, $html, $match);

	/* ----------------------------------
	 * set some work variables
	 *
	 * Note: The oncl-variable contains the name
	 * of the javascript-funktion to get and save
	 * the clicked position within the list
	 * ---------------------------------- */

	  	$getCarPosTxtarea  = ' onclick="getCarPos()" ';			
	  	$class='class="button-apply btn btn-success"';			

	/* ----------------------------------
	 * do the change: 
	 * Put the onClick event before class
 	 * ---------------------------------- */
		$body_new = str_replace($class, $getCarPosTxtarea .$class, $match[0]);   // Für edit  		
		$html = str_replace($match[0], $body_new, $html);

	/* ----------------------------------
	 * put back the changed html and return
	 * ---------------------------------- */
		//J3    JResponse::setBody($html);
		/*J4*/	JFactory::getApplication()->setBody($html);

		return;
    }

   /**
     * Log events.
     *
     * @param string $event The event to be logged.
     * @param string $comment A comment about the event.
     */
	
    private function _log ($status, $comment)
    {
	//	echo '<br /><br /><br /><br /><br />HGH-Log:<br /><br />';
   /*
        jimport('joomla.error.log');

        JLog::getInstance('plugin_system_example_log.php')
        ->addEntry(array('event' => $event, 'comment' => $comment));
   */
    }
}
?>
