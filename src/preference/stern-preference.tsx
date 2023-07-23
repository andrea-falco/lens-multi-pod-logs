import { Renderer } from "@k8slens/extensions";
import { observer } from "mobx-react";
import React from "react";
import { sternPreferenceStore } from "./stern-preference-store";

const {
  Component: { Checkbox },
} = Renderer;

@observer
export class MultiPodLogsSternPreferenceInput extends React.Component {
  render() {
    return (
      <Checkbox
        label="Installed via krew"
        value={sternPreferenceStore.krew}
        onChange={(v) => {
          sternPreferenceStore.krew = v;
        }}
      />
    );
  }
}

export class MultiPodLogsSternPreferenceHint extends React.Component {
  render() {
    return (
      <span>
        Check the box above if you installed stern via <b>krew</b> package
        manager
      </span>
    );
  }
}
