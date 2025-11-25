package com.example.insurai_backend.service;

import com.example.insurai_backend.model.Policy;
import com.example.insurai_backend.model.PolicyPurchase;
import com.example.insurai_backend.model.User;
import com.example.insurai_backend.repository.PolicyPurchaseRepository;
import com.example.insurai_backend.repository.PolicyRepository;
import org.springframework.stereotype.Service;

import org.apache.pdfbox.pdmodel.*;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;

import java.io.ByteArrayOutputStream;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;

import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class PolicyPurchaseService {

    private final PolicyPurchaseRepository repo;
    private final PolicyRepository policyRepo;
    private final AuthService authService;

    public PolicyPurchaseService(PolicyPurchaseRepository repo,
                                 PolicyRepository policyRepo,
                                 AuthService authService) {
        this.repo = repo;
        this.policyRepo = policyRepo;
        this.authService = authService;
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
        PolicyPurchase purchase = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase not found"));

        purchase.setStatus("CANCELLED");
        repo.save(purchase);

        return "Cancelled";
    }

    public List<PolicyPurchase> getMyPurchases() {
        User user = authService.getCurrentUser();
        return repo.findByUser(user);
    }



    public byte[] generateReceipt(Long id) {
        PolicyPurchase p = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase not found"));

        try (PDDocument doc = new PDDocument()) {

            PDPage page = new PDPage(PDRectangle.A4);
            doc.addPage(page);

            PDPageContentStream stream = new PDPageContentStream(doc, page);

            // =======================
            // COMPANY LOGO (OPTIONAL)
            // =======================
            try {
                PDImageXObject logo = PDImageXObject.createFromFile("src/main/resources/static/logo.png", doc);
                stream.drawImage(logo, 50, 740, 120, 60); // x, y, width, height
            } catch (Exception e) {
                // ignore missing logo
            }

            // =======================
            // TITLE
            // =======================
            stream.setFont(PDType1Font.HELVETICA_BOLD, 22);
            stream.beginText();
            stream.newLineAtOffset(200, 780);
            stream.showText("Insurance Receipt");
            stream.endText();


            // =======================
            // PURCHASE TABLE
            // =======================
            int y = 700;
            int step = 22;

            stream.setFont(PDType1Font.HELVETICA, 12);

            String[][] rows = {
                    {"Customer Name", p.getUser().getName()},
                    {"Policy Name", p.getPolicy().getPolicyName()},
                    {"Purchase Date", p.getPurchaseDate().toString()},
                    {"Next Premium Due", p.getNextPremiumDue().toString()},
                    {"Status", p.getStatus()},
                    {"Nominee Name", p.getNomineeName()},
                    {"Nominee Relation", p.getNomineeRelation()},
                    {"Nominee Phone", p.getNomineePhone()},
                    {"Nominee Age", p.getNomineeAge().toString()},
            };

            for (String[] row : rows) {
                stream.beginText();
                stream.newLineAtOffset(50, y);
                stream.showText(row[0] + ": ");
                stream.endText();

                stream.beginText();
                stream.newLineAtOffset(200, y);
                stream.showText(row[1]);
                stream.endText();

                y -= step;
            }

            // =======================
            // QR CODE
            // =======================
            String qrText = "Receipt ID: " + p.getId() +
                    "\nPolicy: " + p.getPolicy().getPolicyName() +
                    "\nCustomer: " + p.getUser().getName();

            QRCodeWriter qrWriter = new QRCodeWriter();
            var bitMatrix = qrWriter.encode(qrText, BarcodeFormat.QR_CODE, 150, 150);
            BufferedImage qrImage = MatrixToImageWriter.toBufferedImage(bitMatrix);

            ByteArrayOutputStream qrOut = new ByteArrayOutputStream();
            ImageIO.write(qrImage, "PNG", qrOut);

            PDImageXObject qr = PDImageXObject.createFromByteArray(doc, qrOut.toByteArray(), "QR");
            stream.drawImage(qr, 400, 600);

            // ================================
            // PREMIUM RENEWAL REMINDER
            // ================================
            long daysLeft = ChronoUnit.DAYS.between(LocalDate.now(), p.getNextPremiumDue());
            y -= 40;

            stream.setFont(PDType1Font.HELVETICA_BOLD, 14);
            stream.beginText();
            stream.newLineAtOffset(50, y);
            stream.showText("Premium Reminder");
            stream.endText();

            y -= 18;
            stream.setFont(PDType1Font.HELVETICA, 12);
            stream.beginText();
            stream.newLineAtOffset(50, y);
            stream.showText("Days left for next premium: " + daysLeft + " days");
            stream.endText();


            // ================================
            // PURCHASE TIMELINE + EXPIRY
            // ================================
            y -= 40;
            stream.setFont(PDType1Font.HELVETICA_BOLD, 14);
            stream.beginText();
            stream.newLineAtOffset(50, y);
            stream.showText("Policy Timeline");
            stream.endText();

            y -= 18;
            stream.setFont(PDType1Font.HELVETICA, 12);
            stream.beginText();
            stream.newLineAtOffset(50, y);
            stream.showText("Policy Term: " + p.getPolicy().getTermInYears() + " years");
            stream.endText();

            LocalDate expiry = p.getPurchaseDate().plusYears(p.getPolicy().getTermInYears());

            y -= 18;
            stream.beginText();
            stream.newLineAtOffset(50, y);
            stream.showText("Policy Expires On: " + expiry);
            stream.endText();


            // =======================
            // SIGNATURE
            // =======================
            stream.setFont(PDType1Font.HELVETICA_BOLD, 14);
            stream.beginText();
            stream.newLineAtOffset(50, 120);
            stream.showText("Authorized Signatory");
            stream.endText();

            stream.setFont(PDType1Font.HELVETICA, 12);
            stream.beginText();
            stream.newLineAtOffset(50, 100);
            stream.showText("InsurAI Digital Signature");
            stream.endText();


            stream.close();

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            doc.save(out);
            return out.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate PDF: " + e.getMessage());
        }
    }



}