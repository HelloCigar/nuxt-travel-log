import type { LngLatLike } from "maplibre-gl";

export const CENTER_MANILA = [120.9842, 14.5995] as LngLatLike;

export const LOCATION_PAGES = new Set(["dashboard", "dashboard-add"]);
export const CURRENT_LOCATION_PAGES = new Set([
  "dashboard-location-slug",
  "dashboard-location-slug-edit",
  "dashboard-location-slug-add",
]);
export const EDIT_PAGES = new Set([
  "dashboard-add",
  "dashboard-location-slug-edit",
  "dashboard-location-slug-add",
]);