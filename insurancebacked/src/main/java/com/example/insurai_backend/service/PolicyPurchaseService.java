package com.example.insurai_backend.service;

import com.example.insurai_backend.model.Policy;
import com.example.insurai_backend.model.PolicyPurchase;
import com.example.insurai_backend.model.User;
import com.example.insurai_backend.repository.PolicyPurchaseRepository;
import com.example.insurai_backend.repository.PolicyRepository;

import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.apache.pdfbox.pdmodel.font.PDType0Font;

import com.google.zxing.MultiFormatWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import org.apache.pdfbox.pdmodel.graphics.image.LosslessFactory;

import java.awt.image.BufferedImage;

@Service
public class PolicyPurchaseService {

    private final PolicyPurchaseRepository repo;
    private final PolicyRepository policyRepo;
    private final AuthService authService;

    public PolicyPurchaseService(
            PolicyPurchaseRepository repo,
            PolicyRepository policyRepo,
            AuthService authService
    ) {
        this.repo = repo;
        this.policyRepo = policyRepo;
        this.authService = authService;
    }

    public PolicyPurchase getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase not found"));
    }

    public PolicyPurchase createPurchase(Long policyId, PolicyPurchase dto) {
        User user = authService.getCurrentUser();
        Policy policy = policyRepo.findById(policyId)
                .orElseThrow(() -> new RuntimeException("Policy not found"));

        PolicyPurchase purchase = new PolicyPurchase();
        purchase.setUser(user);
        purchase.setPolicy(policy);
        purchase.setNomineeName(dto.getNomineeName());
        purchase.setNomineeRelation(dto.getNomineeRelation());
        purchase.setNomineePhone(dto.getNomineePhone());
        purchase.setNomineeAge(dto.getNomineeAge());
        purchase.setPurchaseDate(LocalDate.now());
        purchase.setNextPremiumDue(LocalDate.now().plusMonths(1));
        purchase.setStatus("ACTIVE");

        return repo.save(purchase);
    }

    public String cancelSubscription(Long id) {
        PolicyPurchase purchase = getById(id);
        purchase.setStatus("CANCELLED");
        repo.save(purchase);
        return "Cancelled";
    }

    public List<PolicyPurchase> getMyPurchases() {
        User user = authService.getCurrentUser();
        return repo.findByUser(user);
    }

    // =============================
    //   PDF GENERATION (UNICODE)
    // =============================
    public byte[] generateReceiptPdfBytes(PolicyPurchase purchase) throws Exception {

        DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        try (PDDocument doc = new PDDocument()) {

            // Load unicode font
            InputStream fontStream = getClass().getResourceAsStream("/fonts/NotoSans-Regular.ttf");
            PDType0Font font = PDType0Font.load(doc, fontStream);

            PDPage page = new PDPage(PDRectangle.A4);
            doc.addPage(page);

            try (PDPageContentStream cs = new PDPageContentStream(doc, page)) {

                float margin = 40;
                float y = page.getMediaBox().getHeight() - margin;

                // ========================
                // LOGO
                // ========================
                try {
                    InputStream logoStream = getClass().getResourceAsStream("/static/logo.png");
                    if (logoStream != null) {
                        byte[] logoBytes = logoStream.readAllBytes();
                        PDImageXObject logo = PDImageXObject.createFromByteArray(doc, logoBytes, "logo");

                        float width = 120;
                        float height = (logo.getHeight() * width) / logo.getWidth();
                        cs.drawImage(logo, margin, y - height, width, height);
                    }
                } catch (Exception ex) {
                    System.out.println("Logo not found");
                }

                // ========================
                // HEADER
                // ========================
                write(cs, font, 20, margin + 150, y - 20, "InsurAI Insurance Receipt");

                float cursor = y - 90;

                // ========================
                // PURCHASE DETAILS
                // ========================
                write(cs, font, 12, margin, cursor, "Receipt ID: " + purchase.getId()); cursor -= 18;
                write(cs, font, 12, margin, cursor, "Customer: " + purchase.getUser().getName()); cursor -= 18;
                write(cs, font, 12, margin, cursor, "Email: " + purchase.getUser().getEmail()); cursor -= 18;
                write(cs, font, 12, margin, cursor, "Purchase Date: " + purchase.getPurchaseDate().format(df)); cursor -= 18;
                write(cs, font, 12, margin, cursor, "Next Premium Due: " + purchase.getNextPremiumDue().format(df)); cursor -= 25;

                write(cs, font, 12, margin, cursor, "Policy Name: " + purchase.getPolicy().getPolicyName()); cursor -= 18;
                write(cs, font, 12, margin, cursor, "Premium: ₹" + purchase.getPolicy().getPremium()); cursor -= 18;
                write(cs, font, 12, margin, cursor, "Coverage: ₹" + purchase.getPolicy().getCoverageAmount()); cursor -= 18;

                if (purchase.getPolicy().getTermInYears() != null) {
                    LocalDate expiry = purchase.getPurchaseDate().plusYears(purchase.getPolicy().getTermInYears());
                    write(cs, font, 12, margin, cursor, "Term: " + purchase.getPolicy().getTermInYears() + " years");
                    cursor -= 18;
                    write(cs, font, 12, margin, cursor, "Expiry: " + expiry.format(df));
                    cursor -= 25;
                }

                // ========================
                // QR CODE
                // ========================
                String verifyUrl = "http://localhost:5173/verify-receipt/" + purchase.getId();

                BitMatrix matrix = new MultiFormatWriter()
                        .encode(verifyUrl, BarcodeFormat.QR_CODE, 230, 230);

                BufferedImage qrImage = MatrixToImageWriter.toBufferedImage(matrix);
                PDImageXObject qr = LosslessFactory.createFromImage(doc, qrImage);

                cs.drawImage(qr, page.getMediaBox().getWidth() - 200, cursor + 40, 140, 140);

                // ========================
                // FOOTER
                // ========================
                write(cs, font, 11, margin, 80, "Verify this receipt online:");
                write(cs, font, 11, margin, 60, verifyUrl);
            }

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            doc.save(baos);
            return baos.toByteArray();
        }
    }

    // UNIFIED SAFE TEXT METHOD
    private void write(PDPageContentStream cs, PDType0Font font, int size, float x, float y, String text) throws Exception {
        cs.beginText();
        cs.setFont(font, size);
        cs.newLineAtOffset(x, y);
        cs.showText(text);
        cs.endText();
    }
}
