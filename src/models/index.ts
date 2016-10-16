/** Im */
import * as interfaces from './interfaces';
export { interfaces };


export class Ticket {
  public url: string;
  public email: string;
  public timestamp: Date;
  public image: string;
  public description: string;
  public category: string;

  public constructor(ticket: interfaces.Ticket) {
    this.url = ticket.url;
    this.email = ticket.email;
    this.timestamp = ticket.timestamp;
    this.image = ticket.image;
    this.description = ticket.category;
  }
  public getUrl() { return this.url; }
  public getUsername() { return this.email; }
  public getTimestamp() { return this.timestamp; }
  public getImage() { return this.image; }
  public getDescription() { return this.description; }
  public getCategory() { return this.category; }
}