import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import {loadMilestones, updateMilestones} from '../actions';

export const TRXInterface = (TRXScreen: any) => {
  class TRXInterfaceHOC extends Component {
    // componentDidMount() {
    //   const {milestones} = this.props;

    //   if (!milestones) {
    //     this.props.loadMilestones();
    //   }
    // }

    // handleAssertMilestone = (keys, params) => {
    //   const {milestones, onMilestoneReach} = this.props;
    //   const keysArray = Array.isArray(keys) ? keys : [keys];

    //   const updatedMilestones = keysArray.reduce((ac, key) => {
    //     if (!milestones[key]) {
    //       onMilestoneReach(key, params);
    //       return {...ac, [key]: true};
    //     } else {
    //       return ac;
    //     }
    //   }, {});

    //   if (Object.keys(updatedMilestones).length) {
    //     this.props.updateMilestones(updatedMilestones);
    //   }
    // };

    render() {
      return <TRXScreen {...this.props} {...this.state} />;
    }
  }

  return TRXInterfaceHOC;

  // WithMilestonesHOC.propTypes = {
  //   milestones: PropTypes.object,
  //   onMilestoneReach: PropTypes.func,
  //   loadMilestones: PropTypes.func.isRequired,
  //   updateMilestones: PropTypes.func.isRequired,
  // };

  // WithMilestonesHOC.defaultProps = {
  //   milestones: null,
  //   onMilestoneReach: () => {},
  // };

  // const mapStateToProps = state => ({
  //   milestones: state.milestones,
  // });

  // const mapDispatchToProps = {
  //   loadMilestones,
  //   updateMilestones,
  // };

  // return connect(mapStateToProps, mapDispatchToProps)(WithMilestonesHOC);
};

// export default withMilestones;
