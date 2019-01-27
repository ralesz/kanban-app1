import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Lanes from '../Lane/Lanes';
import styles from '../Lane/Lane.css';
import { createLaneRequest, fetchLanes } from '../Lane/LaneActions';

// import styles from './Kanban.css';

const Kanban = (props) => (
  <div className={styles.kanban}>
      <h2>Kanban board</h2>
      <button
      className={styles.AddLane}
      onClick={() => props.createLane({
      name: 'New lane',
     })}
      >Add Lane</button>
    <div>
    <Lanes
      lanes={props.lanes}
    />
    </div>
  </div>
);

Kanban.need = [() => { return fetchLanes(); }];

Kanban.propTypes = {
  lanes: PropTypes.array,
  createLane: PropTypes.func,
};

const mapStateToProps = state => ({
  lanes: Object.values(state.lanes)
});

const mapDispatchToProps = {
  createLane: createLaneRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Kanban);
