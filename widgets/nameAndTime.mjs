const embeddableCode = "YOUR_WAKATIME_EMBEDDABLE_CODE";
const backgroundColor = new Color("#1d1d1d");
const headerColor = new Color("#ffffff");
const titleColor = new Color("#ffffff");
const timeTextColor = new Color("#79d4e6");
const errorColor = new Color("ff0000")

let wakaData;

const fetchData = async () => {
  try {
    const req = new Request(embeddableCode);
    const daysData = await req.loadJSON();
    wakaData = daysData.data[0]; // get the last day
  } catch (e) {
    console.log("Error: " + e);
    wakaData = null;
  }
}
await fetchData()

const totalTimeString = wakaData ? wakaData.grand_total.digital : "Error";

const widget = new ListWidget();
widget.backgroundColor = backgroundColor;

const header = widget.addText("WakaTime");
header.font = Font.boldSystemFont(24);
header.textColor = headerColor;
header.centerAlignText();

widget.addSpacer(12);

const title = widget.addText("Total Time Today:");
title.textColor = titleColor;
title.font = Font.mediumSystemFont(14);

widget.addSpacer(4);

const timeText = widget.addText(totalTimeString);
timeText.textColor = wakaData ? timeTextColor : errorColor;
timeText.font = Font.boldSystemFont(22);

Script.setWidget(widget);
Script.complete();
