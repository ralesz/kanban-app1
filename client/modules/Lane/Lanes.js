import React from 'react';
import PropTypes from 'prop-types';
import Lane from './LaneContainer.js';
import { moveBetweenLanes } from './LaneActions';

const Lanes = ({ lanes, moveNotes, moveBetweenLanes }) => {
  return (
      <div className={styles.lanes}>{ lanes.map(lane =>
        <Lane className="lane" key={lane.id} lane={lane} moveNotes={moveNotes} moveBetweenLanes={moveBetweenLanes} />
      )}</div>
  );
};

Lanes.propTypes = {
  lanes: PropTypes.array,
  moveNotes: PropTypes.func,
  moveBetweenLanes: PropTypes.func,
};

export default Lanes;