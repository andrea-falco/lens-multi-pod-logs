import { Renderer } from "@k8slens/extensions";
import { observer } from "mobx-react";
import React from "react";
import { sternPreferenceStore } from "./stern-preference-store";

const {
  Component: { SubTitle, Switch, Input, InputValidators },
} = Renderer;

@observer
export class MultiPodLogsSternPreference extends React.Component {
  render() {
    const separatorStyle = {
      minWidth: "40px",
      minHeight: "40px",
    };
    const hintStyle = { marginTop: "8px" };

    return (
      <section>
        <SubTitle title="Krew Package Manager" />
        <Switch
          checked={sternPreferenceStore.krew}
          onChange={() => {
            sternPreferenceStore.krew = !sternPreferenceStore.krew;
          }}
        >
          Enable the switch if you installed stern via krew package manager
        </Switch>

        <div style={separatorStyle}></div>

        <SubTitle title="Max Log Requests" />
        <Input
          theme="round-black"
          type="number"
          validators={InputValidators.isNumber}
          min={1}
          value={sternPreferenceStore.maxLogRequests.toString()}
          onChange={(v) => {
            sternPreferenceStore.maxLogRequests = Number(v);
          }}
        />
        <span style={hintStyle}>
          Maximum number of concurrent logs to request.
        </span>
      </section>
    );
  }
}

export class MultiPodLogsSternPreferenceHint extends React.Component {
  render() {
    return <span></span>;
  }
}
