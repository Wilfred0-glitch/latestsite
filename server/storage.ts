import { contacts, newsletters, type Contact, type Newsletter, type InsertContact, type InsertNewsletter } from "@shared/schema";

export interface IStorage {
  createContact(contact: InsertContact): Promise<Contact>;
  createNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getContacts(): Promise<Contact[]>;
  getNewsletters(): Promise<Newsletter[]>;
}

export class MemStorage implements IStorage {
  private contacts: Map<number, Contact>;
  private newsletters: Map<number, Newsletter>;
  private contactId: number;
  private newsletterId: number;

  constructor() {
    this.contacts = new Map();
    this.newsletters = new Map();
    this.contactId = 1;
    this.newsletterId = 1;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.contactId++;
    const contact: Contact = {
      ...insertContact,
      id,
      type: insertContact.type || 'contact',
      phone: insertContact.phone || null,
      childAge: insertContact.childAge || null,
      message: insertContact.message || null,
      newsletter: insertContact.newsletter || false,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async createNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const id = this.newsletterId++;
    const newsletter: Newsletter = {
      ...insertNewsletter,
      id,
      createdAt: new Date(),
    };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async getNewsletters(): Promise<Newsletter[]> {
    return Array.from(this.newsletters.values());
  }
}

export const storage = new MemStorage();
