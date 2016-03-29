export let tick =                         () => ({type: 'TICK'});
export let interact =                     () => ({type: 'INTERACT'});
export let movementControlsChange = keyState => ({type: 'MOVEMENT_CONTROLS_CHANGE', keyState});
