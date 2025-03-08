import { describe, it, expect, beforeEach } from "vitest";
import { shallowMount } from "@vue/test-utils";
import UpdateHospitalView from "@/views/UpdateHospitalView.vue";

describe(" Tests unitaires basiques - UpdateHospitalView", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(UpdateHospitalView);
  });

  it(" Vérifie que le composant est mount", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it(" Vérifie que l'état initial de hospital est correct", () => {
    expect(wrapper.vm.hospital).toEqual({
      id: undefined, // L'ID est `undefined` dans le composant
      name: "",
      latitude: null,
      longitude: null,
      numberOfBeds: 0,
      specialties: [], //  Utilisation correcte du champ `specialties` au lieu de `specialtyName`
    });
  });

  it(" Vérifie que l'utilisateur peut modifier le nom de l'hôpital", async () => {
    await wrapper.setData({ hospital: { name: "Hôpital Central" } });
    expect(wrapper.vm.hospital.name).toBe("Hôpital Central");
  });

  it(" Vérifie que l'utilisateur peut sélectionner une spécialité", async () => {
    await wrapper.setData({ hospital: { specialtyName: "Cardiologie" } });
    expect(wrapper.vm.hospital.specialtyName).toBe("Cardiologie");
  });


});
