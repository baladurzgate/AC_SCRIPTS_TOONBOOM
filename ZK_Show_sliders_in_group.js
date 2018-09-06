 //Affiche les sliders dans un group selectionné, tiens compte de tout les sous groupes
 
 
 function ZK_Show_sliders_in_group(){

	MessageLog.trace( "---SHOW_SLIDERS_IN_GROUPS_RECURSIVE---");

	var selectedNodes = selection.numberOfNodesSelected(); 

	var cf = frame.current(); 

	if(selectedNodes){ 

		scene.beginUndoRedoAccum("ZK_Show_sliders_in_group"); 

		MessageLog.trace( "NODES_SELECTED  "+selectedNodes);
		
		var analysed_grouds =[]
		var groups_to_analyse = [];


		//Première boucle parmis les nodes selectionnés
		for(var n = 0; n < selectedNodes; n++){ 

			var currentNode = selection.selectedNodes(n);
			//current_node_name = node.getName(currentNode);
			//MessageLog.trace(current_node_name);
			//MessageLog.trace(currentNode);

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
					//MessageLog.trace(sub_node_name);
					MessageLog.trace(sub_node_type);
					
					if( sub_node_type == "GROUP"){
						
						// extension de la boucle de recherche au nouveau groupe trouvé
						MessageLog.trace(sub_node_name);
						groups_to_analyse.push(sub_node_name);
						number_of_groups++;
						
					}
	
					if( sub_node_type == "MasterController"){

						//on ajoute le slider à la selection 
						selection.addNodeToSelection(sub_node_name);
						MessageLog.trace(sub_node_name);
						
					}
					
			}			
			
		}

  		// on massque tout les controleurs actifs
 		 Action.perform("onActionHideAllControls()","cameraView");
  		Action.perform("onActionHideAllControls()","scene");

  		// on active l'affichage des controllers
 		 Action.perform("onActionToggleControl()", "cameraView");

     	scene.endUndoRedoAccum();  

 	}else{  

		//si rien n'est selectionné on deselectionne cache tout les sliders
     		
 		 Action.perform("onActionHideAllControls()","cameraView");
  		Action.perform("onActionHideAllControls()","scene");
	} 
}  
