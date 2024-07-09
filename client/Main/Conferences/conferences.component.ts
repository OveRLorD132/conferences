import {Component, Input} from "@angular/core";
import {ConferenceType, Visibility} from "../types/enum";
import {CallRaw} from "../../../server/module/types";
import API from "../../module/API";

@Component({
  selector: "conferences",
  templateUrl: "./conferences.component.html",
  styleUrls: ["./conferences.component.scss"]
})
export class ConferencesComponent {
  @Input() public ;

  public overlay: Visibility = Visibility.Hidden;
  protected readonly Visibility = Visibility;

  public name: string;
  public description: string;
  public confType: ConferenceType;

  public conferencesList: CallRaw[] = [];

  public setOption(option: ConferenceType) {
    console.log(option);
    this.confType = option;
  }

  public showOverlay(): void {
    this.overlay = Visibility.Visible;
  }
  public hideOverlay(): void {
    this.overlay = Visibility.Hidden;
  }

  public async createCall(): Promise<void> {
    const added = await API.addCall({
      name: this.name,
      description: this.description,
      confType: this.confType
    });

    this.hideOverlay();
  }

  protected readonly ConferenceType = ConferenceType;
}