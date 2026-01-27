const apiKey = "YOUR_WAKATIME_API_KEY";
const backgroundColor = new Color("#1d1d1d");
const headerColor = new Color("#ffffff");
const titleColor = new Color("#ffffff");
const timeTextColor = new Color("#79d4e6");

const timeZone = "Europe/Moscow";
// see MDN for reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat

const today = new Intl.DateTimeFormat("sv", {
  timeZone: timeZone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
})
  .format(new Date())
  .split("-")
  .join("-");

const url = `https://wakatime.com/api/v1/users/current/durations?date=${today}&api_key=${apiKey}`;

let wakaData;

const fetchData = async () => {
  try {
    const req = new Request(url);
    wakaData = await req.loadJSON();
  } catch (e) {
    console.log("Error: " + e);
    wakaData = null;
  }
};

await fetchData();

let totalSeconds = 0;
if (wakaData && wakaData.data) {
  wakaData.data.forEach((item) => {
    totalSeconds += item.duration;
  });
}

const hours = Math.floor(totalSeconds / 3600);
const minutes = Math.floor((totalSeconds % 3600) / 60);
const seconds = Math.floor(totalSeconds % 60);

const totalTimeString =
  hours === 0 ? `${minutes}m ${seconds}s` : `${hours}h ${minutes}m ${seconds}s`;

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
timeText.textColor = timeTextColor;
timeText.font = Font.boldSystemFont(22);

Script.setWidget(widget);
Script.complete();
