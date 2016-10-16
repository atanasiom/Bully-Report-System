/** Im */
import * as interfaces from './interfaces';
export { interfaces };


export class Ticket {
  public url: string;
  public email: string;
  public timestamp: string;
  public image: string;
  public description: string;
  public category: string;
  public status: string;

  public constructor(ticket: interfaces.Ticket) {
    this.url = ticket.url;
    this.email = ticket.email;
    this.timestamp = ticket.timestamp;
    this.image = ticket.image;
    this.description = ticket.description;
    this.status = ticket.status;
    this.category = ticket.category;
  }
  public getUrl() { return this.url; }
  public getEmail() { return this.email; }
  public getTimestamp() { return this.timestamp; }
  public getImage() { return this.image; }
  public getDescription() { return this.description; }
  public getCategory() { return this.category; }
  public getStatus() { return this.status; }
}