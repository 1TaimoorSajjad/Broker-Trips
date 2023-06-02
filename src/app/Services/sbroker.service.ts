import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SbrokerService {
  formData: any[] = [];
  latestId: number = 0;
 
  setBokerFormData(data: any) {
    this.latestId++;
    data.id = this.latestId;
    this.formData.push(data);
  }

  updateDataById(id: number, updatedData: any) {
    const index = this.formData.findIndex(item => item.id === id);
    if (index !== -1) {
      updatedData.id = id;
      this.formData[index] = updatedData;
    }
  }

  getDataById(id: number) {
    return this.formData.find(item => item.id === id);
  }

  getDispData(): any[] {
    return this.formData;
  }

  getDispDataById(id: number) {
    const data = this.formData.find(item => item.id === id);
    return data ? { ...data } : null;
  }

  updateBrokerFormData(id: number, updatedData: any) {
    const data = this.getDispDataById(id);
    if (data) {
      const updatedFormData = { ...data, ...updatedData };
      this.updateDataById(id, updatedFormData);
    }
  }
}
