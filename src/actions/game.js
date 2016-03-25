export let tick = () => ({type: 'TICK'})
export let movementControlsChange = keyState => ({type: 'MOVEMENT_CONTROLS_CHANGE', keyState});

export let faceDirection =         direction => ({type: 'FACE_DIRECTION', direction});
export let setWalkingStatus =         status => ({type: 'SET_WALKING_STATUS', status});
export let beginMoveTo =            position => ({type: 'BEGIN_MOVE_TO', position});
export let setMovingStatus =          status => ({type: 'SET_MOVING_STATUS', status});
export let changeMap =                   map => ({type: 'CHANGE_MAP', map});
export let changePosition =         position => ({type: 'CHANGE_POSITION', position});
export let followPortal =             portal => ({type: 'FOLLOW_PORTAL', portal});
export let setTweenMovements =          flag => ({type: 'SET_TWEEN_MOVEMENTS', flag});
export let finishWalking =                () => ({type: 'FINISH_WALKING'});
export let beginFadeOut =                 () => ({type: 'BEGIN_FADE_OUT'});
export let beginFadeIn =                  () => ({type: 'BEGIN_FADE_IN'});
export let triggerMovement =              () => ({type: 'TRIGGER_MOVEMENT'});
export let act =                          () => ({type: 'ACT'});
export let disableControls =              () => ({type: 'DISABLE_CONTROLS'});
export let enableControls =               () => ({type: 'ENABLE_CONTROLS'});
