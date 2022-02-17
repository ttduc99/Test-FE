import React from 'react';
import './demo.scss';
class ChildComponent extends React.Component {
  state = {
    showJobs: false,
  };
  handleShowHide = () => {
    this.setState({
      showJobs: !this.state.showJobs,
    });
  };
  handleOnclickDelete = (job) => {
    // console.log(job)
    this.props.deleteAjob(job);
  };
  render() {
    let { arrJobs } = this.props;
    let { showJobs } = this.state;
    // let check = showJobs === true ? "showJobs=true" : "showJobs=false";
    // console.log("check conditinal: ", check);
    return (
      <>
        {showJobs === false ? (
          <div>
            <button className='btn-show' onClick={() => this.handleShowHide()}>
              Show
            </button>
          </div>
        ) : (
          // }
          // {showJobs &&
          <>
            <div className='job-lists'>
              {arrJobs.map((item, index) => {
                return (
                  <div key={item.id}>
                    {item.title}-{item.salary} <></>
                    <button onClick={() => this.handleOnclickDelete(item)}>
                      X
                    </button>
                  </div>
                );
              })}
            </div>
            <div>
              <button onClick={() => this.handleShowHide()}>Hide</button>
            </div>
          </>
        )}
      </>
    );
  }
}
export default ChildComponent;
