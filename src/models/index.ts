export class Ticket {

  private url: string;
  private username: string;
  private timestamp: Date;
  private image: string;
  private description: string;
  private category: string;

  public constructor(url?: string, username?: string, timestamp?: Date, image?: string, description?: string, category?: string) {
    this.url = url;
    this.username = username;
    this.timestamp = timestamp;
    this.image = image;
    this.description = category;
  }
  public getUrl() { return this.url; }
  public getUsername() { return this.username; }
  public getTimestamp() { return this.timestamp; }
  public getImage() { return this.image; }
  public getDescription() { return this.description; }
  public getCategory() { return this.category; }
}