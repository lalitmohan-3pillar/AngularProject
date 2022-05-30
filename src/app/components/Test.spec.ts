import { FiltersComponent } from "./shopping-cart/filters/filters.component";


describe("Filter Component",()=>{
    let component: FiltersComponent;
    it("Clear", () => {
        expect(component.Clear()).toBe(0);
      });
})