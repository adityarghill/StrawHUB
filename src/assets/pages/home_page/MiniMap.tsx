export default function MiniMap() {
  return (
    <div className="w-full h-full">
      <iframe
        title="Peta Jakarta"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d833.7590018015198!2d106.85153716246285!3d-6.257335267459218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3b2b5f25827%3A0xfb448f6e57a7a372!2sKalibata%20City%2C%20Jl.%20Raya%20Kalibata%20No.1%2C%20RT.9%2FRW.4%2C%20Rawajati%2C%20Kec.%20Pancoran%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2012750!5e0!3m2!1sid!2sid!4v1761488648555!5m2!1sid!2sid"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}