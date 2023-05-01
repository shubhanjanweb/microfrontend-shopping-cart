import { singleSpaNavigate } from "@ogani/spa-shared-module";

function navigate(event) {
  console.log('navigate called');
  singleSpaNavigate(event);
}