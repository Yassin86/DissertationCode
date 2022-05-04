import React, { useEffect, useRef } from 'react';
import { DataSet, Network} from 'vis-network/standalone/esm/vis-network';

const getId = (nodes, label) => {
	return nodes.getIds().map(id => nodes.get(id).label === label).indexOf(true) + 1
}

const StateMachine = ({machine, arrows}) => {

	if (!machine) {
		window.location.reload()
	}

	const domNode = useRef(null);
	const network = useRef(null);

	// An array of nodes
	const nodes = new DataSet(machine.states.map((s, index) => ({
		id : index + 1, 
		label : s,
		color : {
			background : s === machine.states[0] ? "#90ee90" : machine.halting.includes(s) ? "#ff4d4d" : ""
		}
	})));
	
	const edges = new DataSet(machine.transition_function.map(tf => ({
		from: getId(nodes,tf.split(';')[0].split(':')[0]), 
		to: getId(nodes, tf.split(';')[1].split(':')[0]), 
		label: tf.split(';')[0].split(':')[1],
		arrows: {
			to : {
				enabled : arrows,
				type : 'arrow'
			}
		}
	})));

	const data = {
	nodes,
	edges
	};

	var options = {
		layout: {
            randomSeed: 1,
        }
	}
	

	useEffect(() => {
		network.current = new Network(domNode.current, data, options);
		// stop physics engine after stabilization
		network.current.on("stabilizationIterationsDone", function () {
			network.current.setOptions( { physics: false } );
		});
	},[arrows]);

	return (
	<div className='diagram' ref = { domNode } style={{height : '400px'}} />
	);
};

export default StateMachine;