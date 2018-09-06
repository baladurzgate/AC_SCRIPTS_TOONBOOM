 /*

Script pour gagner du temps dans la mise en place de peg d'animation (ex master controler)

Ajoute deux pegs à  chaque node drawing seletionnés.
Les deux pegs conservent le meme point de pivot que le drawing. 
Le deuxieme peg "MC" est tagé dans la timeline pour le retrouver plus facilement.

*/

function ZK_Add_MC_Parent()
{  
	MessageLog.trace( "---ADD_MC_PARENT_LOG---");

	var selectedNodes = selection.numberOfNodesSelected(); 

	var cf = frame.current(); 

	//Nomenclature 
	var prefix_controler= "MC_";

	if(selectedNodes){ 

		scene.beginUndoRedoAccum("Add_MC_Parent"); 
		
		//Pour chaque node selectionné
		for(var n = 0; n < selectedNodes; n++){ 

			//Nom et coordonnées du node dans le node view
			var currentNode = selection.selectedNode(n);
			var currentNodeName = node.getName(currentNode );
			var posX = node.coordX(currentNode); 
     	 		var posY = node.coordY(currentNode);  

			//On ajoute le premier peg
			var drawingPegName  = currentNodeName+"-P";
         		var drawingPeg =  node.add(node.parentNode(currentNode), drawingPegName  , "PEG", posX , posY - 100, 0);

			node.link(drawingPeg, 0,  currentNode , 0);

			//On récupère le pivot du drawing
			var P= node.getPivot(currentNode,cf);

				 
			//On ajoute le MC peg
			var mcPegName = prefix_controler+currentNodeName+"-P";
         		var mcPeg =  node.add(node.parentNode(currentNode), mcPegName  , "PEG", posX, posY - 200, 0);
			node.link(mcPeg, 0,  drawingPeg , 0);

			// On colle les coordonnées du pivot. 
			node.setTextAttr( mcPeg  , "PIVOT.X", cf , P.x);  
			node.setTextAttr( mcPeg  , "PIVOT.Y", cf , P.y);  

			//On tag le MCpeg pour le retouver plus facilement dans la timeline. 
			node.setTimelineTag(mcPeg,true);

			//On clean le drawing  
			node.setTextAttr( currentNode  , "USE_DRAWING_PIVOT", cf , "Apply Embedded Pivot on Parent Peg");  
			node.setTextAttr( currentNode  , "CAN_ANIMATE", cf , false);  


     	}  

     	scene.endUndoRedoAccum();  

 	}else{  
     		MessageBox.information("You must select at least one node");
	} 
}  
