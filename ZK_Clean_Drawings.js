
//Version du 07/09/2018
 //Alexandre Cormier
//Nettoie les drawing dans un dossier (animate: off, embed on parent peg:true)
/*
Reste à coder : 
-Message box affichant tout les drawings corrigés 
-Options de clean 
-Function de suppression des elements non exposés



*/
 
function ZK_Clean_Drawings(){


	MessageLog.trace( "-------ZK_CLEAN_DRAWINGS-------");

	var cf = frame.current(); 

	var factor = 0.1;

	scene.beginUndoRedoAccum("ZK_Clean_Drawings"); 


	if( selection.numberOfNodesSelected()>0){ 

		MessageLog.trace( "NODES_SELECTED  "+selection.numberOfNodesSelected());
		
		var groups_to_analyse = [];

		var drawings_to_treat =[];

		var selected_nodes = selection.selectedNodes(0);

		//Première boucle parmis les nodes selectionnés
		for(var n = 0; n < selection.numberOfNodesSelected(); n++){ 

			var currentNode = selected_nodes[n];

			// on ajoute le peg à la liste de traitement
			if(node.type(currentNode)=="READ"){
				
				MessageLog.trace(currentNode+" selected");
				drawings_to_treat.push(currentNode);

			} 

			if(node.type(currentNode)=="GROUP"){
				
				MessageLog.trace(currentNode);
				groups_to_analyse.push(currentNode);

			} 



     	}  

		
		var number_of_groups = groups_to_analyse.length;

		MessageLog.trace( "GROUPS SELECTED "+number_of_groups);
		
		//deuxième boucle recursive à travers les groupes 
		for (var g = 0 ; g < number_of_groups ; g ++){
			
			currentGroup = groups_to_analyse[g];
			var subNodesInGroup= node.numberOfSubNodes(currentGroup);
			
			for (var sn = 0 ; sn < subNodesInGroup; sn++){

					var sub_node_name = node.subNode(currentGroup,sn);
					var sub_node = node.subNodeByName(currentGroup,sub_node_name);
					var sub_node_type = node.type(sub_node_name);
					
					if( sub_node_type == "GROUP"){
						
						// extension de la boucle de recherche au nouveau groupe trouvé
						MessageLog.trace(sub_node_name);
						groups_to_analyse.push(sub_node_name);
						number_of_groups++;
						
					}
	
					if( sub_node_type == "READ"){

						// on ajoute le peg à la liste de traitement
						MessageLog.trace(sub_node_name+" selected");
						drawings_to_treat.push(sub_node_name);


						
					}
					
			}			
			
		}

		MessageLog.trace( "DRAWINGS SELECTED "+drawings_to_treat.length);


		// On multiplie le Z de chaque peg par le facteur (0.1 de base)
		for (var d = 0 ; d < drawings_to_treat.length ; d ++){

			currentDrawing = drawings_to_treat[d];
						//On clean le drawing  

			node.setTextAttr( currentDrawing  , "CAN_ANIMATE", cf , true);  

			//Code pour supprimmer les eventuelles clefs au niveau du drawing

			//Code pour supprimer tout les elements non exposés



			node.setTextAttr( currentDrawing  , "USE_DRAWING_PIVOT", cf , "Apply Embedded Pivot on Parent Peg");  
			node.setTextAttr( currentDrawing  , "CAN_ANIMATE", cf , false);  
			

		}

     	scene.endUndoRedoAccum();  
     	MessageLog.trace( "-------ZK_CLEAN_DRAWINGS------ENDLOG-");

 	}else{  

	} 
}  
