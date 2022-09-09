import React from 'react';
import { PlayButton, PauseButton, ForwardButton, ReverseButton,
   ElapsedTimeValue, ElapsedTimeRange } from 'harmoware-vis';
import { Text3dDataInput } from './text-3d-data-input';

export default class Controller extends React.Component {
  onClick(buttonType){
    const { viewState, updateViewState } = this.props;
    switch (buttonType) {
      case 'zoom-in': {
        updateViewState({...viewState, zoom:(viewState.zoom+0.25), transitionDuration: 100,})
        break
      }
      case 'zoom-out': {
        updateViewState({...viewState, zoom:(viewState.zoom-0.25), transitionDuration: 100,})
        break
      }
      case 'reset': {
        updateViewState({
          target: [0, 0, 0],
          rotationX: 5,
          rotationOrbit: -5,
          zoom: 3,
          transitionDuration: 200,
        })
        break
      }
    }
  }

  setClusterNum(e){
    const { setClusterNum } = this.props;
    setClusterNum(+e.target.value)
  }

  setTextSiza(e){
    const { setTextSiza } = this.props;
    setTextSiza(+e.target.value)
  }

  render() {

    const { actions, inputFileName, animatePause, animateReverse, leading,
      settime, timeBegin, timeLength, clusterNum, textSiza } = this.props;
    const { text3dDataFileName } = inputFileName;

    return (
        <div className="harmovis_controller">
            <ul className="flex_list">
            <li className="flex_row">
                <div className="harmovis_input_button_column" title='3D object data selection'>
                <label htmlFor="Text3dDataInput">
                3D text data selection<Text3dDataInput actions={actions} id="Text3dDataInput"/>
                </label>
                <div>{text3dDataFileName}</div>
                </div>
            </li>
            <li className="flex_row">
              {animatePause ?
                <PlayButton actions={actions} />:<PauseButton actions={actions} />
              }&nbsp;
              {animateReverse ?
                <ForwardButton actions={actions} />:<ReverseButton actions={actions} />
              }
            </li>
            <li className="flex_row">
              <button onClick={this.onClick.bind(this,'zoom-in')} className='harmovis_button'>＋</button>
              <button onClick={this.onClick.bind(this,'zoom-out')} className='harmovis_button'>－</button>
              <button onClick={this.onClick.bind(this,'reset')} className='harmovis_button'>RESET</button>
            </li>
            <li className="flex_row">
              <label htmlFor="ElapsedTimeValue">elapsedTime</label>
              <ElapsedTimeValue settime={settime} timeBegin={timeBegin} timeLength={timeLength} actions={actions}
              min={leading*-1} id="ElapsedTimeValue" />
            </li>
            <li className="flex_row">
              <ElapsedTimeRange settime={settime} timeLength={timeLength} timeBegin={timeBegin} actions={actions}
              min={leading*-1} style={{'width':'100%'}} />
            </li>
            <li className="flex_row">
            <label htmlFor="setClusterNum">Cluster Number</label>
              <input type="range" value={clusterNum} min={1} max={10} step={1} onChange={this.setClusterNum.bind(this)}
                className='harmovis_input_range' id='setClusterNum' title={clusterNum}/>
            </li>
            <li className="flex_row">
            <label htmlFor="setTextSiza">Text Size</label>
              <input type="range" value={textSiza} min={0} max={20} step={0.2} onChange={this.setTextSiza.bind(this)}
                className='harmovis_input_range' id='setTextSiza' title={clusterNum}/>
            </li>
            </ul>
        </div>
    );
  }
}
