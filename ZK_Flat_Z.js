
//Version du 20/08/2018
 //Alexandre Cormier
 //multiplie la position en Z de chaque Peg selectionné par un facteur (0.1)
 //Ne fonctionne pas sur les pegs qui ont des clefs. 
 
function ZK_Flat_Z(){


	MessageLog.trace( "-------ZK_FLAT_Z-------");

	var cf = frame.current(); 

	var factor = 0.1;

	scene.beginUndoRedoAccum("ZK_Flat_Z"); 


	if( selection.numberOfNodesSelected()>0){ 

		MessageLog.trace( "NODES_SELECTED  "+selection.numberOfNodesSelected());
		
		var groups_to_analyse = [];

		var pegs_to_treat =[];

		var selected_nodes = selection.selectedNodes(0);

		//Première boucle parmis les nodes selectionnés
		for(var n = 0; n < selection.numberOfNodesSelected(); n++){ 

			var currentNode = selected_nodes[n];

			// on ajoute le peg à la liste de traitement
			if(node.type(currentNode)=="PEG"){
				
				MessageLog.trace(currentNode+" selected");
				pegs_to_treat.push(currentNode);

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
	
					if( sub_node_type == "PEG"){

						// on ajoute le peg à la liste de traitement
						MessageLog.trace(sub_node_name+" selected");
						pegs_to_treat.push(sub_node_name);
						
					}
					
			}			
			
		}

		MessageLog.trace( "PEGS SELECTED "+pegs_to_treat.length);


		// On multiplie le Z de chaque peg par le facteur (0.1 de base)
		for (var p = 0 ; p < pegs_to_treat.length ; p ++){

			currentPeg = pegs_to_treat[p];

			var old_Z = 0
			var new_Z = 0;

			//On parcour les différents systemes de coordonnées 
			if(node.getTextAttr(currentPeg, cf, "POSITION.Z" )){

				old_Z = node.getTextAttr(currentPeg, cf, "POSITION.Z" );
				new_Z = old_Z*factor;
				node.setTextAttr(currentPeg  , "POSITION.Z", cf , new_Z);  

			}
			if(node.getTextAttr(currentPeg, cf, "POS.Z" )){

				old_Z = node.getTextAttr(currentPeg, cf, "POS.Z" );
				new_Z = old_Z*factor;
				node.setTextAttr(currentPeg  , "POS.Z", cf , new_Z); 
			}
			if(node.getTextAttr(currentPeg, cf, "OFFSET.Z" )){

				old_Z = node.getTextAttr(currentPeg, cf, "OFFSET.Z" );
				new_Z = old_Z*factor;
				node.setTextAttr(currentPeg  , "OFFSET.Z", cf , new_Z); 
			}
			if(node.getTextAttr(currentPeg, cf, "POSITION.SEPARATE.Z" )){

				old_Z = node.getTextAttr(currentPeg, cf, "POSITION.SEPARATE.Z" );
				new_Z = old_Z*factor;
				node.setTextAttr(currentPeg  , "POSITION.SEPARATE.Z", cf , new_Z); 
			}

			if(old_Z){

				MessageLog.trace("PEG "+currentPeg+" Z changed from "+old_Z+" to "+new_Z);

			}

			

		}

     	scene.endUndoRedoAccum();  
     	MessageLog.trace( "-------ZK_FLAT_Z------ENDLOG-");

 	}else{  

	} 
}  
