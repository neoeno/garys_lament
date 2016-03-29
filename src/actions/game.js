export let tick =                         () => ({type: 'TICK'});
export let act =                          () => ({type: 'ACT'});
export let movementControlsChange = keyState => ({type: 'MOVEMENT_CONTROLS_CHANGE', keyState});
