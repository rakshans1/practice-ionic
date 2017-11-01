export class SettingsService {
  private altBack = false;

  setAltBackground(isAlt: boolean) {
    this.altBack = isAlt;
  }

  isAltBackground() {
    return this.altBack;
  }
}
