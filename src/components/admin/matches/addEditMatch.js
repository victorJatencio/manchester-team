import React, { Component } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";

import FormField from "../../ui/formFields";
import { validate } from "../../ui/misc";

import { firebaseTeams, firebase_db, firebaseMatches } from "../../../firebase";
import { firebaseLoop } from "../../ui/misc";

class AddEditMatch extends Component {
  state = {
    matdId: "",
    formType: "",
    formError: false,
    formSuccess: "",
    teams: [],
    formdata: {
      date: {
        element: "input",
        value: "",
        config: {
          label: "Event Date",
          name: "date_input",
          type: "date"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      local: {
        element: "select",
        value: "",
        config: {
          label: "Select Team",
          name: "select_local",
          type: "select",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: false
      },
      resultLocal: {
        element: "input",
        value: "",
        config: {
          label: "Result local",
          name: "result_local_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: false
      },
      away: {
        element: "select",
        value: "",
        config: {
          label: "Select Team",
          name: "select_local",
          type: "select",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: false
      },
      resultAway: {
        element: "input",
        value: "",
        config: {
          label: "Result local",
          name: "result_local_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: false
      },
      referee: {
        element: "input",
        value: "",
        config: {
          label: "Referee",
          name: "referee_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      stadium: {
        element: "input",
        value: "",
        config: {
          label: "Stadium",
          name: "stadium_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      result: {
        element: "select",
        value: "",
        config: {
          label: "Team result",
          name: "select_result",
          type: "select",
          options: [
            { kew: "W", value: "W" },
            { kew: "L", value: "L" },
            { kew: "D", value: "D" },
            { kew: "n/a", value: "n/a" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      final: {
        element: "select",
        value: "",
        config: {
          label: "Game Played",
          name: "select_played",
          type: "select",
          options: [
            { kew: "Yes", value: "Yes" },
            { kew: "No", value: "No" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      }
    }
  };

  updateForm(element) {
    const newFormData = { ...this.state.formData };
    const newElement = { ...newFormData[element.id] };

    newElement.value = element.event.target.value;

    let validData = validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newFormData[element.id] = newElement;

    this.setState({
      formError: false,
      formData: newFormData
    });
  }

  updateFields(match, teamOptions, teams, type, matchId) {
    const newFormData = {
      ...this.state.formdata
    };

    for (let key in newFormData) {
      if (match) {
        newFormData[key].value = match[key];
        newFormData[key].valid = true;
      }
      if (key === "local" || key === "away") {
        newFormData[key].config.options = teamOptions;
      }
    }

    this.setState({
      matchId,
      formType: type,
      formdata: newFormData,
      teams
    });
  }

  componentDidMount() {
    const matchId = this.props.match.params.id;
    const getTeams = (match, type) => {
      firebaseTeams.once("value").then(snapshot => {
        const teams = firebaseLoop(snapshot);
        const teamOptions = [];

        snapshot.forEach(childSnapshot => {
          teamOptions.push({
            key: childSnapshot.val().shortName,
            value: childSnapshot.val().shortName
          });
        });
        this.updateFields(match, teamOptions, teams, type, matchId);
      });
    };

    if (!matchId) {
      /// ADD MATCH
    } else {
      firebase_db
        .ref(`matches/${matchId}`)
        .once("value")
        .then(snapshot => {
          const match = snapshot.val();
          getTeams(match, "Edit Match");
        });
    }
  }

  render() {
    return (
      <AdminLayout>
        <div className="editmatch_dialog_wrapper">
          <h2>{this.state.formType}</h2>

          <div>
            <form onSubmit={event => this.submitForm(event)}>
              <FormField
                id={"date"}
                formData={this.state.formdata.date}
                change={element => this.updateForm(element)}
              />

              <div className="select_team_layout">
                <div className="label_inputs">Local</div>
                <div className="wrapper">
                  <div className="left">
                    <FormField
                      id={"local"}
                      formData={this.state.formdata.local}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className="right">
                    <FormField
                      id={"resultLocal"}
                      formData={this.state.formdata.resultLocal}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
              </div>

              <div className="select_team_layout">
                <div className="label_inputs">Away</div>
                <div className="wrapper">
                  <div className="left">
                    <FormField
                      id={"away"}
                      formData={this.state.formdata.away}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className="right">
                    <FormField
                      id={"resultAway"}
                      formData={this.state.formdata.resultAway}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
              </div>

              <div className="split_fields">
                <FormField
                  id={"referee"}
                  formData={this.state.formdata.referee}
                  change={element => this.updateForm(element)}
                />

                <FormField
                  id={"stadium"}
                  formData={this.state.formdata.stadium}
                  change={element => this.updateForm(element)}
                />
              </div>

              <div className="split_fields last">
                <FormField
                  id={"result"}
                  formData={this.state.formdata.result}
                  change={element => this.updateForm(element)}
                />

                <FormField
                  id={"final"}
                  formData={this.state.formdata.final}
                  change={element => this.updateForm(element)}
                />
              </div>

              <div className="success_label">{this.state.formSuccess}</div>
              {this.state.formError ? (
                <div className="error_label">Something is wrong!</div>
              ) : (
                ""
              )}

              <div className="admin_submit">
                <button onClick={event => this.submitForm(event)}>
                  {this.state.formType}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditMatch;
