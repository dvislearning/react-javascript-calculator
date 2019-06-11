import { modifyDisplay } from './actions';

export const mapStateToProps = (state) => {
    return {display: state}
  };
  
export const mapDispatchToProps = (dispatch) => {
    return {
      handleDisplayInput: (userInput) => {
        dispatch(modifyDisplay(userInput))
      }
    }
};
  